const AuthService = require("../services/AuthService");
const JwtService = require("../services/JwtService");
const User = require("../models/User");

class AuthController {
    async register(req, res, next) {
        console.log(req.body);
        const { login, email, password, password_confirmation } = req.body;
        try {
            const user = await AuthService.register(login, email, password, password_confirmation);
            return AuthService.send_auth_response(res, user, "Registration successful", 201)
        }
        catch (error) {
            next(error);
        }
    }

    async login(req, res, next) {
        console.log(req.body);
        const { login, email, password } = req.body;
        try {
            const user = await AuthService.login(login, email, password);
            return AuthService.send_auth_response(res, user, "Login successful", 200)
        }
        catch (error) {
            next(error);
        }
    }

    async refresh(req, res, next) {
        try {
            const refresh_token = req.cookies.refresh_token;

            if (!refresh_token) {
                return res.status(401).json({ error: 'Refresh token is required' });
            }

            const decoded = JwtService.verify_refresh_token(refresh_token);
            const user = await User.find({id: decoded.id});

            if (!user) {
                return res.status(401).json({ error: 'User not found' });
            }

            return AuthService.send_auth_response(res, user, 'Tokens refreshed successfully', 200);
        }
        catch (error) {
            next(error);
        }
    }

    async logout(req, res) {
        console.log(req.body);
        res.status(200).json({});
    }

    async reset_link(req, res) {
        console.log(req.body);
    }

    async reset_confirm(req, res) {
        console.log(req.body);
    }
}

module.exports = new AuthController();
