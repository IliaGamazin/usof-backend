import Post from "../models/Post.js";
import UsersFavourites from "../models/UsersFavourites.js";

import NotFoundException from "../exceptions/NotFoundException.js";
import PermissionException from "../exceptions/PermissionException.js";
import ConflictException from "../exceptions/ConflictException.js";

class FavouritesService {
    async add_favourite(requestor, post_id) {
        const post = await Post.find({ id: post_id });
        if (!post) {
            throw new NotFoundException("No post with id");
        }

        if (requestor.role !== "ADMIN" && post.status === "INACTIVE") {
            throw new PermissionException();
        }

        const existing = await UsersFavourites.find({ user_id: requestor.id, post_id });
        if (existing) {
            throw new ConflictException("Favourite post with id already exists");
        }

        const favourite = new UsersFavourites({
            user_id: requestor.id,
            post_id
        });

        await favourite.save();
    }

    async delete_favourite(requestor, post_id) {
        const existing = await UsersFavourites.find({ user_id: requestor.id, post_id });
        if (!existing) {
            throw new NotFoundException("No favourite post with id");
        }

        await existing.delete();
    }
}

export default new FavouritesService();
