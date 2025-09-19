const Post = require("../models/Post");
const User = require("../models/User");
const PostsCategories = require("../models/PostsCategories");
const Category = require("../models/Category");
const PostImage = require("../models/PostImage");

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

        const images = await PostImage.get_all({post_id: id});
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

        console.log(files);

        if (!await User.find(author_id)) {
            throw new CredentialsException("No author with id");
        }

        if (categories.length === 0) {
            throw new CredentialsException("Invalid categories");
        }

        const categories_ids = await CategoryService.parse_categories(categories)

        const id = await post.save();

        await CategoryService.save_categories(id, categories_ids);

        const info_arr = await FileService.save_post_images(id, files)
        return { post, info_arr };
    }

    async update_post(id, author_id, title, content, categories, files_to_delete, files) {
        let post = await Post.find({ id });
        if (!post) {
            throw new CredentialsException("No post with id");
        }

        if (post.author_id !== author_id) {
            throw new PermissionException("Permission denied");
        }

        if (title !== undefined && title !== null) {
            post.title = title;
        }

        if (content !== undefined && content !== null) {
            post.content = content;
        }

        const curr_categories = await PostsCategories.get_all({ post_id: id });
        for (const cc of curr_categories) {
            const pc = await PostsCategories.find({ id: cc.id });
            await pc.delete();
        }

        const categories_ids = await CategoryService.parse_categories(categories)
        await CategoryService.save_categories(id, categories_ids);

        if (files_to_delete && files_to_delete.length > 0) {
            const post_images = await PostImage.get_all({ post_id: id });
            console.log(post_images);
            for (const post_image of post_images) {
                const image = await PostImage.find({ id: post_image.id });
                await image.delete();
            }
        }

        if (files !== undefined && files !== null && files.length > 0) {
            await FileService.save_post_images(id, files)
        }

        await post.save();
        const images = await PostImage.get_all({post_id: id});
        return { post, images };
    }

    async delete_post(id, requestor) {
        const post = await Post.find({ id });
        if (!post) {
            throw new CredentialsException("No post with id");
        }
        if (requestor.id !== post.author_id && requestor.role !== "ADMIN") {
            throw new PermissionException("Permission denied");
        }

        await post.delete();
        await FileService.delete_post_directory(id);
    }
}

module.exports = new PostService();
