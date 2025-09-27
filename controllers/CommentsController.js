import CommentService from "../services/CommentService.js";
import Post from "../models/Post.js";

class CommentsController {
    async get_comment(req, res, next) {
        try {
            const result = await CommentService.get_comment(
                req.params.comment_id
            );

            const post = await Post.find({ id: result.comment.post_id });

            if (post.status === "INACTIVE" && req.user.role !== "ADMIN") {
                return res.status(403).send();
            }

            return res.status(201).json(result);
        }
        catch (error) {
            next(error);
        }
    }

    async get_comment_likes(req, res, next) {
        try {
            const result = await CommentService.get_comment_likes(
                req.params.comment_id,
            );

            return res.status(200).json(result);
        }
        catch (error) {
            next(error);
        }
    }

    async update_comment(req, res, next) {
        try {
            const result = await CommentService.update_comment(
                req.params.comment_id,
                req.body.content,
                req.user
            );

            return res.status(204).json(result);
        }
        catch (error) {
            next(error);
        }
    }

    async new_comment_like(req, res, next) {
        try {
            const type = req.query.type;
            if (type !== "LIKE" && type !== "DISLIKE") {
                return res.status(401).send();
            }

            await CommentService.new_comment_like(
                req.params.comment_id,
                req.user,
                type
            );

            return res.status(201).send();
        }
        catch (error) {
            next(error);
        }
    }

    async delete_comment_like(req, res, next) {
        try {
            await CommentService.delete_comment_like(
                req.params.comment_id,
                req.user.id,
            );

            return res.status(204).send();
        }
        catch (error) {
            next(error);
        }
    }

    async delete_comment(req, res, next) {
        try {
            await CommentService.delete_comment(
                req.params.comment_id,
                req.user
            );
            return res.status(204).json();
        }
        catch (error) {
            next(error);
        }
    }
}

export default new CommentsController();
