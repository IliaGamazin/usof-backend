import SubscriptionsService from "../services/SubscriptionsService.js";
import Post from "../models/Post.js";
import pool from "../db/pool.js"

class SubscriptionsController {
    async get_subscriptions(req, res, next) {
        try {
            let page = parseInt(req.query.page, 10) || 1;
            let limit = parseInt(req.query.limit, 10) || 10;
            let order_by = req.query.order_by || "score";
            let order_dir = req.query.order_dir || "DESC";
            let where = {};
            let where_like = {};

            if (req.user.role !== "ADMIN") {
                where.status = "ACTIVE";
            }

            where["us.user_id"] = req.user.id;

            if (req.query.title) {
                where_like["posts.title"] = req.query.title;
            }

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
                table: "users_subscriptions us",
                condition: "us.post_id = posts.id",
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
                where_like,
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
                                : order_by === "created_at" ? "posts.created_at"
                                    : order_by === "id" ? "posts.id"
                                        : order_by === "title" ? "posts.title"
                                            : `posts.${order_by}`,
                order_dir
            });

            if (result.data.length > 0) {
                const postIds = result.data.map(post => post.id);

                const [categoryRows] = await pool.execute(
                    `SELECT 
                pc.post_id,
                c.id,
                c.title,
                c.description
            FROM posts_categories pc
            INNER JOIN categories c ON c.id = pc.category_id
            WHERE pc.post_id IN (${postIds.map(() => '?').join(',')})`,
                    postIds
                );

                const categoriesByPost = {};
                for (const row of categoryRows) {
                    if (!categoriesByPost[row.post_id]) {
                        categoriesByPost[row.post_id] = [];
                    }
                    categoriesByPost[row.post_id].push({
                        id: row.id,
                        title: row.title,
                        description: row.description
                    });
                }

                result.data = result.data.map(post => ({
                    ...post,
                    categories: categoriesByPost[post.id] || []
                }));
            }

            return res.status(200).json(result);
        }
        catch (error) {
            next(error);
        }
    }

    async add_subscription(req, res, next) {
        try {
            await SubscriptionsService.add_subscription(
                req.user,
                req.params.post_id
            );

            return res.status(201).send();
        }
        catch (error) {
            next(error);
        }
    }

    async delete_subscription(req, res, next) {
        try {
            await SubscriptionsService.delete_subscription(
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

export default new SubscriptionsController();
