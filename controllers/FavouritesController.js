import FavouritesService from "../services/FavouritesService.js";
import Post from "../models/Post.js";

class FavouritesController {
    async get_favourites(req, res, next) {
        try {
            let page = parseInt(req.query.page, 10) || 1;
            let limit = parseInt(req.query.limit, 10) || 10;
            let order_by = req.query.order_by || "score";
            let order_dir = req.query.order_dir || "DESC";
            let where = {};

            if (req.user.role !== "ADMIN") {
                where.status = "ACTIVE";
            }

            where["uf.user_id"] = req.user.id;

            let categories = [];
            if (req.query.categories) {
                if (Array.isArray(req.query.categories)) {
                    categories = req.query.categories.map(Number);
                }
                else {
                    categories = req.query.categories.split(",").map(Number);
                }
            }

            const joins = [];

            joins.push({
                table: "users_favourites uf",
                condition: "uf.post_id = posts.id",
                type: "INNER"
            });

            if (categories.length > 0) {
                joins.push({
                    table: "posts_categories pc",
                    condition: "pc.post_id = posts.id",
                    type: "INNER"
                });
                where["pc.category_id"] = categories;
            }

            joins.push({
                table: "likes l",
                condition: "l.post_id = posts.id",
                type: "LEFT"
            });

            const result = await Post.get_joined_paged({
                joins,
                where,
                page,
                limit,
                select: `
                posts.*,
                SUM(l.reaction = 'LIKE') as like_count,
                SUM(l.reaction = 'DISLIKE') as dislike_count,
                (SUM(l.reaction = 'LIKE') - SUM(l.reaction = 'DISLIKE')) as score
            `,
                group_by: "posts.id",
                order_by:
                    order_by === "likes" ? "like_count"
                        : order_by === "dislikes" ? "dislike_count"
                            : order_by === "score" ? "score"
                                : `posts.${order_by}`,
                order_dir
            });

            return res.status(200).json(result);
        }
        catch (error) {
            next(error);
        }
    }

    async add_favourite(req, res, next) {
        try {
            await FavouritesService.add_favourite(
                req.user,
                req.params.post_id
            );

            return res.status(201).send();
        }
        catch (error) {
            next(error);
        }
    }

    async delete_favourite(req, res, next) {
        try {
            await FavouritesService.delete_favourite(
                req.user,
                req.params.post_id
            );

            return res.status(204).send();
        }
        catch (error) {
            next(error);
        }
    }
}

export default new FavouritesController();
