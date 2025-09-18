const UserService = require("../services/UserService");
const User = require("../models/User");

class UsersController {
    async get_users(req, res, next) {
        try {
            let page = parseInt(req.query.page, 10) || 1;
            let limit = parseInt(req.query.limit, 10) || 10;
            let order_by = req.query.order_by || "id";
            let order_dir = req.query.order_dir || "ASC";
            const allowed = ["id", "login", "rating"];
            if (!allowed.includes(order_by)) {
                order_by = "id";
            }

            const result = await User.get_all_paged({
                page,
                limit,
                order_by,
                order_dir,
            });

            const res_data = result.data.map(user => {
                const { password, ...safe } = user; // strip password
                return safe;
            });

            res.json({
                data: res_data,
                pagination: result.pagination,
            });
        }
        catch (error) {
            next(error);
        }
    }

    async get_user(req, res, next) {
        try {
            const id = req.params.user_id;
            const user = await UserService.get_user(id);
            res.status(200).json(user);
        }
        catch (error) {
            next(error);
        }
    }

    async new_user(req, res, next) {
        try {
            const {
                login,
                firstname,
                lastname,
                email,
                password,
                password_confirmation,
                role
            } = req.body;
            await UserService.new_user(
                login,
                firstname,
                lastname,
                email,
                password,
                password_confirmation,
                role);
            return res.status(201).send();
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

            const {
                login,
                firstname,
                lastname,
                email,
                password
            } = req.body;
            await UserService.update_user(
                id,
                login,
                firstname,
                lastname,
                email,
                password,
                user_role
            );
            return res.status(204).send();
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
            const id = req.user.id;
            await UserService.set_avatar(id, req.file);

            res.status(204).send();
        }
        catch (error) {
            next(error);
        }
    }

    async delete_user(req, res, next) {
        try {
            const id = req.params.user_id;
            const requestor = req.user;
            await UserService.delete_user(id, requestor);
            res.status(204).send();
        }
        catch (error) {
            next(error);
        }
    }
}

module.exports = new UsersController();
