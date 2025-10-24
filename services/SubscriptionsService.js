import Post from "../models/Post.js";
import UsersSubscriptions from "../models/UsersSusbcriptions.js";

import NotFoundException from "../exceptions/NotFoundException.js";
import PermissionException from "../exceptions/PermissionException.js";

import Mailer from "./Mailer.js";

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

    async delete_subscription(requestor, post_id) {
        const existing = await UsersSubscriptions.find({ user_id: requestor.id, post_id });
        if (!existing) {
            throw new NotFoundException("No followed post with id");
        }

        await existing.delete();
    }

    async notify_users(message, post_id) {
        const subscriptions = await UsersSubscriptions.get_all({ post_id });
        const user_ids = subscriptions.map(subscription => subscription.user_id);

        console.log(`Notifying users about post ${post_id}: ${message}`);
        user_ids.forEach(user_id => {
            console.log(`User ID: ${user_id}`);
        });
    }
}

export default new SubscriptionsService();
