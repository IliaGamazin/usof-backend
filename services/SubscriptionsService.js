import Post from "../models/Post.js";
import UsersSubscriptions from "../models/UsersSusbcriptions.js";

import NotFoundException from "../exceptions/NotFoundException.js";
import PermissionException from "../exceptions/PermissionException.js";


class SubscriptionsService {
    async add_subscription(requestor, post_id) {
        const post = await Post.find({ id: post_id });
        if (!post) {
            throw new NotFoundException("No post with id");
        }

        if (requestor.role !== "ADMIN" && post.status === "INACTIVE") {
            throw new PermissionException();
        }

        const existing = await UsersSubscriptions.find({ user_id: requestor.id, post_id });
        if (existing) {
            return;
        }

        const subscription = new UsersSubscriptions({
            user_id: requestor.id,
            post_id
        });
        await subscription.save();
    }
}

export default new SubscriptionsService();
