const CommentService = require("../services/CommentService");
const Post = require("../models/Post");

class CommentsController {
    async get_comment(req, res, next) {
        try {
            const comment = await CommentService.get_comment(
                req.params.comment_id
            );

            const post = await Post.find({ id: comment.post_id });

            if (post.status === "INACTIVE" && req.user.role !== "ADMIN") {
                return res.status(403).send();
            }

            res.status(201).json(comment);
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

            res.status(204).json(result);
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
            res.status(204).json();
        }
        catch (error) {
            next(error);
        }
    }
}

module.exports = new CommentsController();
