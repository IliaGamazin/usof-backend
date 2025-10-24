import UserService from "../services/UserService.js";
import User from "../models/User.js";

class UsersController {
    async get_me(req, res, next) {
        try {
            const user = await UserService.get_user(
                req.user.id
            );
            res.status(200).json(user);
        }
        catch (error) {
            next(error);
        }
    }

    async get_users(req, res, next) {
        try {
            let page = parseInt(req.query.page, 10) || 1;
            let limit = parseInt(req.query.limit, 10) || 10;
            let order_by = req.query.order_by || "id";
            let order_dir = req.query.order_dir || "ASC";
            let where = {};
            let where_like = {};

            const allowed = ["id", "login", "rating", "created_at"];
            if (!allowed.includes(order_by)) {
                order_by = "id";
            }

            if (req.query.login) {
                where_like.login = req.query.login;
                console.log(req.query.login);
            }

            let result = await User.get_all_paged({
                where,
                where_like,
                page,
                limit,
                order_by,
                order_dir,
            });

            console.log(result);

            result.data = result.data.map(user => {
                const { password, ...safe } = user;
                return safe;
            });

            res.json(result);
        }
        catch (error) {
            next(error);
        }
    }

    async get_user(req, res, next) {
        try {
            const user = await UserService.get_user(
                req.params.user_id
            );
            res.status(200).json(user);
        }
        catch (error) {
            next(error);
        }
    }

    async new_user(req, res, next) {
        try {
            const result = await UserService.new_user(
                req.body.login,
                req.body.firstname,
                req.body.lastname,
                req.body.email,
                req.body.password,
                req.body.password_confirmation,
                req.body.role
            );
            return res.status(200).json(result);
        }
        catch (error) {
            next(error);
        }
    }

    async update_user(req, res, next) {
        try {
            const id = req.params.user_id;
            const user_role = req.user.role;
            if (req.user.id != id && user_role !== "ADMIN") {
                return res.status(403).send()
            }

            const result = await UserService.update_user(
                id,
                req.body.login,
                req.body.firstname,
                req.body.lastname,
            );

            return res.status(200).json(result);
        }
        catch (error) {
            next(error);
        }
    }

    async set_avatar(req, res, next) {
        try {
            if (!req.file) {
                return res.status(400).json({
                    message: 'Avatar file is required'
                });
            }

            if (req.file.size > 5 * 1024 * 1024) {
                return res.status(400).json({
                    message: 'File size must be less than 5MB'
                });
            }

            await UserService.set_avatar(
                req.user.id,
                req.file
            );

            res.status(204).send();
        }
        catch (error) {
            next(error);
        }
    }

    async delete_user(req, res, next) {
        try {
            await UserService.delete_user(
                req.params.user_id,
                req.user
            );
            res.status(204).send();
        }
        catch (error) {
            next(error);
        }
    }
}

export default new UsersController();
