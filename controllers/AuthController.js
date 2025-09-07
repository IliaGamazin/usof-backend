const User = require("../models/User");
const AuthService = require("../services/AuthService");

class AuthController {
    async register(req, res, next) {
        console.log(req.body);
        const { login, email, password, password_confirmation } = req.body;
        try {
            await AuthService.register(login, email, password, password_confirmation);
            res.status(201).json({})
        }
        catch (error) {
            next(error);
        }
    }

    async login(req, res) {
        console.log(req.body);
    }

    async logout(req, res) {
        console.log(req.body);
    }

    async reset_link(req, res) {
        console.log(req.body);
    }

    async reset_confirm(req, res) {
        console.log(req.body);
    }
}

module.exports = new AuthController();