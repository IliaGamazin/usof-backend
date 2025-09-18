const Post = require("../models/Post");
const User = require("../models/User");
const PostsCategories = require("../models/PostsCategories");
const Category = require("../models/Category");

const CredentialsException = require("../exceptions/CredentialsException");

const FileService = require("./FileService");
const CategoryService = require("./CategoryService");
const PermissionException = require("../exceptions/PermissionException");

class PostService {
    async get_post(id) {
        const post = await Post.find({ id });
        if (!post) {
            throw new CredentialsException("No post with id");
        }

        const images = await FileService.get_post_images(id);
        return { post, images };
    }

    async get_post_categories(id) {
        const post = await Post.find({ id });
        if (!post) {
            throw new CredentialsException("No post with id");
        }

        let res = []
        const posts_categories =  await PostsCategories.get_all({ post_id: id });
        for (const pc of posts_categories) {
            const category = await Category.find({ id: pc.category_id });
            res.push(category);
        }
        return res;
    }

    async new_post(author_id, title, content, categories, files) {
        const post = new Post({
            author_id,
            title,
            status: "ACTIVE",
            content,
            created_at: new Date(),
            updated_at: new Date(),
        });

        if (!await User.find(author_id)) {
            throw new CredentialsException("No author with id");
        }

        if (categories.length === 0) {
            throw new CredentialsException("Invalid categories");
        }

        const categories_ids = await CategoryService.parse_categories(categories)

        const id = await post.save();

        console.log(id);
        console.log(categories);
        console.log(categories_ids);

        await CategoryService.save_categories(id, categories_ids);

        let info_arr = [];
        for (let i = 0; i < files.length; i++) {
            const info = await FileService.save_image(files[i], `posts/${id}`, i);
            info_arr.push(info);
        }
        return { post, info_arr };
    }

    async update_post(id, author_id, title, content, categories, files) {
        let post = await Post.find({ id });
        if (!post) {
            throw new CredentialsException("No post with id");
        }

        if (post.author_id !== author_id) {
            throw new PermissionException("Permission denied");
        }

        const categories_ids = await CategoryService.parse_categories(categories)
        await CategoryService.save_categories(id, categories_ids);

        post.title = title;
        post.content = content;

        await FileService.delete_post_directory(id);
        let info_arr = [];
        for (let i = 0; i < files.length; i++) {
            const info = await FileService.save_image(files[i], `posts/${id}`, i);
            info_arr.push(info);
        }
        await post.save();

        return { post, info_arr };
    }

    async delete_post(id, requestor) {
        const post = await Post.find({ id });
        if (!post) {
            throw new CredentialsException("No post with id");
        }
        if (requestor.id !== post.author_id && requestor.role !== "ADMIN") {
            throw new PermissionException("Permission denied");
        }

        const pc = await PostsCategories.get_all({ post_id: id });
        for (const pc1 of pc) {
            await pc1.delete();
        }

        await post.delete();
        await FileService.delete_post_directory(id);
    }
}

module.exports = new PostService();
