const Comment = require("../models/Comment");
const CredentialsException = require("../exceptions/CredentialsException");
const PermissionException = require("../exceptions/PermissionException");

class CommentService {
    async get_comment(id) {
        const comment = await Comment.find({ id });
        if (!comment) {
            throw new CredentialsException("No comment with id");
        }

        return comment;
    }

    async new_comment(post_id, author_id, content) {
        const comment = new Comment({
            author_id,
            content,
            post_id,
            created_at: new Date(),
            updated_at: new Date(),
        });

        await comment.save();
        return comment;
    }

    async delete_comment(id, requestor) {
        const comment = await Comment.find({ id });
        if (!comment) {
            throw new CredentialsException("No comment with id");
        }

        if (parseInt(requestor.id) !== comment.author_id && requestor.role !== "ADMIN") {
            throw new PermissionException();
        }

        await comment.delete();
    }
}

module.exports = new CommentService();
