const Post = require("../models/Post");

const PostService = require("../services/PostService");

class PostsController {
    async get_posts(req, res, next) {
        try {
            let page = parseInt(req.query.page, 10) || 1;
            let limit = parseInt(req.query.limit, 10) || 10;
            let order_by = req.query.order_by || "created_at";
            let order_dir = req.query.order_dir || "DESC";
            let where = {};
            if (req.user.role !== "ADMIN") {
                where = {status: "ACTIVE"};
            }

            const result = await Post.get_all_paged({
                where,
                page,
                limit,
                order_by,
                order_dir,
            });

            res.json(result);
        }
        catch (error) {
            next(error);
        }
    }

    async get_post(req, res, next) {
        try {
            const id = req.params.post_id;
            const post = await PostService.get_post(id);

            if (post.status === "INACTIVE" && req.user.role !== "ADMIN") {
                return res.status(403).json({})
            }

            res.status(200).json(post);
        }
        catch (error) {
            next(error);
        }
    }

    async get_post_comments(req, res, next) {
        try {

        }
        catch (error) {
            next(error);
        }
    }

    async new_post_comment(req, res, next) {
        try {

        }
        catch (error) {
            next(error);
        }
    }

    async get_post_categories(req, res, next) {
        try {
            const id = req.params.post_id;
            const categories = await PostService.get_post_categories(id);
            res.status(200).json({categories});
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
            const files = req.files;
            const author = req.user.id;

            const { title, content, categories } = req.body;
            const categories_arr = Array.isArray(req.body.categories)
                ? req.body.categories
                : (req.body.categories ? [req.body.categories] : []);
            const result = await PostService.new_post(author, title, content, categories_arr, files);

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
            console.log(req.body);
            const files = req.files;
            const author = req.user.id;
            const id = req.params.post_id;

            const { title, content, categories } = req.body;
            const categories_arr = Array.isArray(req.body.categories)
                ? req.body.categories
                : (req.body.categories ? [req.body.categories] : []);

            const result = await PostService.update_post(id, author, title, content, categories_arr, files);
            res.status(204).json(result);
        }
        catch (error) {
            next(error);
        }
    }

    async delete_post(req, res, next) {
        try {
            const id = req.params.post_id;
            const requestor = req.user;

            await PostService.delete_post(id, requestor);
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
