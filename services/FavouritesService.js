import Post from "../models/Post.js";
import UsersFavourites from "../models/UsersFavourites.js";

import NotFoundException from "../exceptions/NotFoundException.js";
import PermissionException from "../exceptions/PermissionException.js";


class FavouritesService {
    async add_favourite(requestor, post_id) {
        const post = await Post.find({ post_id });
        if (!post) {
            throw new NotFoundException("No post with id");
        }

        if (requestor.role !== "ADMIN" && post.status === "INACTIVE") {
            throw new PermissionException();
        }

        const existing = UsersFavourites.find({user_id: requestor.id, post_id })
        if (existing) {
            return;
        }

        const favourite = new UsersFavourites({
            user_id: requestor.id,
            post_id
        });
        await favourite.save();
    }
}

export default new FavouritesService();
