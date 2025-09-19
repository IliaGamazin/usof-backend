const Post = require("../models/Post");

const PostService = require("../services/PostService");
const CommentService = require("../services/CommentService");

class PostsController {
    async get_posts(req, res, next) {
        try {
            let page = parseInt(req.query.page, 10) || 1;
            let limit = parseInt(req.query.limit, 10) || 10;
            let order_by = req.query.order_by || "created_at";
            let order_dir = req.query.order_dir || "DESC";
            let where = {};

            if (req.user.role !== "ADMIN") {
                where.status = "ACTIVE";
            }

            let categories = req.query.categories
                ? req.query.categories.split(",").map(Number)
                : [];

            const joins = [];
            if (categories.length > 0) {
                joins.push({
                    table: "posts_categories pc",
                    condition: "pc.post_id = posts.id",
                    type: "INNER"
                });
                where["pc.category_id"] = categories;
            }

            const result = await Post.get_joined_paged({
                joins,
                where,
                page,
                limit,
                order_by,
                order_dir,
                select: "posts.*"
            });

            res.json(result);
        }
        catch (error) {
            next(error);
        }
    }

    async get_post(req, res, next) {
        try {
            const post = await PostService.get_post(
                req.params.post_id
            );

            if (post.status === "INACTIVE" && req.user.role !== "ADMIN") {
                return res.status(403).send();
            }

            res.status(200).json(post);
        }
        catch (error) {
            next(error);
        }
    }

    async get_post_comments(req, res, next) {
        try {
            let page = parseInt(req.query.page, 10) || 1;
            let limit = parseInt(req.query.limit, 10) || 10;
            let order_by = req.query.order_by || "created_at";
            let order_dir = req.query.order_dir || "DESC";

            const result = await PostService.get_post_comments(
                req.params.post_id,
                page,
                limit,
                order_by,
                order_dir,
            );

            res.status(200).json(result);
        }
        catch (error) {
            next(error);
        }
    }

    async new_post_comment(req, res, next) {
        try {
            const id = req.params.post_id;
            const post = await PostService.get_post(id);

            if (post.status === "INACTIVE" && req.user.role !== "ADMIN") {
                return res.status(403).send();
            }

            const result = await CommentService.new_comment(
                id,
                req.user.id,
                req.body.content
            );

            res.status(200).json(result);
        }
        catch (error) {
            next(error);
        }
    }

    async get_post_categories(req, res, next) {
        try {
            const id = req.params.post_id;
            const categories = await PostService.get_post_categories(id);
            res.status(200).json({ categories });
        }
        catch (error) {
            next(error);
        }
    }

    async get_post_likes(req, res, next) {
        try {

        }
        catch (error) {
            next(error);
        }
    }

    async new_post(req, res, next) {
        try {
            const categories_arr = Array.isArray(req.body.categories)
                ? req.body.categories
                : (req.body.categories ? [req.body.categories] : []);

            const result = await PostService.new_post(
                req.user.id,
                req.body.title,
                req.body.content,
                categories_arr,
                req.files
            );

            res.status(200).json(result);
        }
        catch (error) {
            next(error);
        }
    }

    async new_post_like(req, res, next) {
        try {

        }
        catch (error) {
            next(error);
        }
    }

    async update_post(req, res, next) {
        try {
            const categories_arr = Array.isArray(req.body.categories)
                ? req.body.categories
                : (req.body.categories ? [req.body.categories] : []);

            const files_to_delete_arr = Array.isArray(req.body.files_to_delete)
                ? req.body.files_to_delete
                : (req.body.files_to_delete ? [req.body.files_to_delete] : []);

            const result = await PostService.update_post(
                req.params.post_id,
                req.user.id,
                req.body.title,
                req.body.content,
                categories_arr,
                files_to_delete_arr,
                req.files
            );
            res.status(204).json(result);
        }
        catch (error) {
            next(error);
        }
    }

    async delete_post(req, res, next) {
        try {
            await PostService.delete_post(
                req.params.post_id,
                req.user
            );
            res.status(204).json();
        }
        catch (error) {
            next(error);
        }
    }

    async delete_post_like(req, res, next) {
        try {

        }
        catch (error) {
            next(error);
        }
    }
}

module.exports = new PostsController();
