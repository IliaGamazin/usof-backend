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

    async update_user(req, res, next) {
        try {
            res.status(200).json({});
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

    async new_user(req, res, next) {
        try {
            const { login, email, password,
                password_confirmation, role } = req.body;
            await UserService.new_user(login, email, password,
                password_confirmation, role);
            return res.status(201).send();
        }
        catch (error) {
            next(error);
        }
    }

    async set_avatar(req, res, next) {
        try {
            res.status(204).send();
        }
        catch (error) {
            next(error);
        }
    }
}

module.exports = new UsersController();
