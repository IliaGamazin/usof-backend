const UserService = require("../services/UserService");

class UsersController {
    async get_users(req, res, next) {
        try {
            res.status(200).json({});
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
