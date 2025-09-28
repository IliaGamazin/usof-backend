import Post from "../models/Post.js";
import User from "../models/User.js";
import PostsCategories from "../models/PostsCategories.js";
import Category from "../models/Category.js";
import Comment from "../models/Comment.js";
import PostImage from "../models/PostImage.js";
import Like from "../models/Like.js";

import CredentialsException from "../exceptions/CredentialsException.js";
import NotFoundException from "../exceptions/NotFoundException.js";

import FileService from "./FileService.js";
import CategoryService from "./CategoryService.js";
import PermissionException from "../exceptions/PermissionException.js";
import SubscriptionsService from "../services/SubscriptionsService.js";

class PostService {
    async get_post(id) {
        const post = await Post.find({ id });
        if (!post) {
            throw new NotFoundException("No post with id");
        }

        const likes = await Like.get_all({ post_id: id });
        const score = likes.reduce((acc, like) => {
            if (like.reaction === "LIKE") return acc + 1;
            if (like.reaction === "DISLIKE") return acc - 1;
            return acc;
        }, 0);

        const images = await PostImage.get_all({ post_id: id });
        return { post, images, score: score };
    }

    async get_post_categories(id, requestor) {
        const post = await Post.find({ id });
        if (!post) {
            throw new NotFoundException("No post with id");
        }

        if (post.status === "INACTIVE" && requestor.role !== "ADMIN") {
            throw new PermissionException();
        }

        let res = []
        const posts_categories =  await PostsCategories.get_all({ post_id: id });
        for (const pc of posts_categories) {
            const category = await Category.find({ id: pc.category_id });
            res.push(category);
        }
        return res;
    }

    async get_post_comments(id, page, limit, order_by, order_dir, requestor) {
        const post = await Post.find({ id });
        if (!post) {
            throw new NotFoundException("No post with id");
        }

        if (post.status === "INACTIVE" && requestor.role !== "ADMIN") {
            throw new PermissionException();
        }

        const joins = [{
            table: "comment_likes cl",
            condition: "cl.comment_id = comments.id",
            type: "LEFT"
        }];

        return await Comment.get_joined_paged({
            joins,
            where: { post_id: id },
            page,
            limit,
            select: `
            comments.*,
            SUM(cl.reaction = 'LIKE') as like_count,
            SUM(cl.reaction = 'DISLIKE') as dislike_count,
            (SUM(cl.reaction = 'LIKE') - SUM(cl.reaction = 'DISLIKE')) as score
        `,
            group_by: "comments.id",
            order_by:
                order_by === "likes" ? "like_count"
                    : order_by === "dislikes" ? "dislike_count"
                        : order_by === "score" ? "score"
                            : `comments.${order_by}`,
            order_dir
        });
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
            throw new NotFoundException("No author with id");
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

    async new_post_like(id, user, reaction) {
        const post = await Post.find({ id });
        if (!post) {
            throw new NotFoundException("No post with id");
        }

        if (post.status === "INACTIVE" && user.role !== "ADMIN") {
            throw new PermissionException();
        }

        const author = await User.find({ id: post.author_id });
        const same = await Like.find({
            user_id: user.id ,
            post_id: id,
        });

        if (same) {
            same.reaction === "LIKE" ? author.rating-- : author.rating++;
            await same.delete();
            await author.save();
        }

        reaction === "LIKE" ? author.rating++ : author.rating--;
        const like = new Like({
            user_id: user.id,
            post_id: id,
            reaction
        });

        await author.save();
        await like.save();
    }

    async get_post_likes(id, requestor) {
        const post = await Post.find({ id });
        if (!post) {
            throw new NotFoundException("No post with id");
        }

        if (post.status === "INACTIVE" && requestor.role !== "ADMIN") {
            throw new PermissionException();
        }

        return await Like.get_all({ post_id: id });
    }

    async delete_post_like(id, user_id) {
        const post = await Post.find({ id });
        if (!post) {
            throw new CredentialsException("No post with id");
        }

        const author = await User.find({ id: post.author_id });
        const like = await Like.find({
            user_id: user_id ,
            post_id: id,
        });

        if (!like) {
            throw new CredentialsException("No like for post from user");
        }

        like.reaction === "LIKE" ? author.rating-- : author.rating++;
        await like.delete();
        await author.save();
    }

    async update_post(id, author, title, content, categories, files_to_delete, files, status) {
        let post = await Post.find({ id });
        if (!post) {
            throw new NotFoundException("No post with id");
        }

        if (post.author_id !== author.id && author.role !== "ADMIN") {
            throw new PermissionException("Permission denied");
        }

        if (title !== undefined && title !== null) {
            post.title = title;
        }

        if (content !== undefined && content !== null) {
            post.content = content;
        }

        if (status === "ACTIVE" || status === "INACTIVE") {
            post.status = status;
        }

        const curr_categories = await PostsCategories.get_all({ post_id: id });
        for (const cc of curr_categories) {
            const pc = await PostsCategories.find({ id: cc.id });
            await pc.delete();
        }


        const categories_ids = await CategoryService.parse_categories(categories)
        await CategoryService.save_categories(id, categories_ids);

        if (files_to_delete && files_to_delete.length > 0) {
            for (const file_id of files_to_delete) {
                const image = await PostImage.find({ id: file_id });
                if (image) {
                    await image.delete();
                }
            }
        }

        if (files !== undefined && files !== null && files.length > 0) {
            await FileService.save_post_images(id, files)
        }

        await SubscriptionsService.notify_users("Post updated", post.id);

        await post.save();
        const images = await PostImage.get_all({post_id: id});
        return { post, images };
    }

    async delete_post(id, requestor) {
        const post = await Post.find({ id });
        if (!post) {
            throw new NotFoundException("No post with id");
        }
        if (requestor.id !== post.author_id && requestor.role !== "ADMIN") {
            throw new PermissionException("Permission denied");
        }

        await post.delete();
        await FileService.delete_post_directory(id);
    }
}

export default new PostService();
