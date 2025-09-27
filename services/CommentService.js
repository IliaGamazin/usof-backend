import Comment from "../models/Comment.js";
import User from "../models/User.js";
import CommentLike from "../models/CommentLike.js";
import SubscriptionsService from "../services/SubscriptionsService.js";

import NotFoundException from "../exceptions/NotFoundException.js";
import PermissionException from "../exceptions/PermissionException.js";

class CommentService {
    async get_comment(id) {
        const comment = await Comment.find({ id });
        if (!comment) {
            throw new NotFoundException("No comment with id");
        }

        console.log(id);
        console.log(comment);

        const likes = await CommentLike.get_all({ comment_id: id });
        const score = likes.reduce((acc, like) => {
            if (like.reaction === "LIKE") return acc + 1;
            if (like.reaction === "DISLIKE") return acc - 1;
            return acc;
        }, 0);

        return { comment, score: score };
    }

    async new_comment(post_id, author_id, content) {
        const comment = new Comment({
            author_id,
            content,
            post_id,
            created_at: new Date(),
            updated_at: new Date(),
        });

        await SubscriptionsService.notify_users("New comment", post_id);

        await comment.save();
        return comment;
    }

    async get_comment_likes(id) {
        const comment = await Comment.find({ id });
        if (!comment) {
            throw new NotFoundException("No comment with id");
        }

        return await CommentLike.get_all({ comment_id: id });
    }

    async update_comment(id, content, requestor) {
        const comment = await Comment.find({ id });
        if (!comment) {
            throw new NotFoundException("No comment with id");
        }

        if (requestor.id !== comment.author_id && requestor.role !== "ADMIN") {
            throw new PermissionException();
        }

        if (content !== null && content !== undefined) {
            comment.content = content;
        }

        await comment.save();
        return comment;
    }

    async new_comment_like(id, user, reaction) {
        const comment = await Comment.find({ id });
        if (!comment) {
            throw new NotFoundException("No comment with id");
        }

        const author = await User.find({ id: comment.author_id });
        const same = await CommentLike.find({
            user_id: user.id ,
            comment_id: id,
        });

        if (same) {
            same.reaction === "LIKE" ? author.rating-- : author.rating++;
            await same.delete();
            await author.save();
        }

        reaction === "LIKE" ? author.rating++ : author.rating--;
        const like = new CommentLike({
            user_id: user.id,
            comment_id: id,
            reaction
        });

        await author.save();
        await like.save();
    }

    async delete_comment_like(id, user_id) {
        const comment = await Comment.find({ id });
        if (!comment) {
            throw new NotFoundException("No comment with id");
        }

        const author = await User.find({ id: comment.author_id });
        const like = await CommentLike.find({
            user_id: user_id ,
            comment_id: id,
        });

        if (!like) {
            throw new NotFoundException("No like for comment from user");
        }

        like.reaction === "LIKE" ? author.rating-- : author.rating++;
        await like.delete();
        await author.save();
    }

    async delete_comment(id, requestor) {
        const comment = await Comment.find({ id });
        if (!comment) {
            throw new NotFoundException("No comment with id");
        }

        if (requestor.id !== comment.author_id && requestor.role !== "ADMIN") {
            throw new PermissionException();
        }

        await comment.delete();
    }
}

export default new CommentService();
