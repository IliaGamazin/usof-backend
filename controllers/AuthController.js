import AuthService from "../services/AuthService.js";
import JwtService from "../services/JwtService.js";
import User from "../models/User.js";

class AuthController {
    async register(req, res, next) {
        try {
            const user = await AuthService.register(
                req.body.login,
                req.body.firstname,
                req.body.lastname,
                req.body.email,
                req.body.password,
                req.body.password_confirmation,
            );
            return AuthService.send_auth_response(res, user, "Registration successful", 201)
        }
        catch (error) {
            next(error);
        }
    }

    async login(req, res, next) {
        try {
            const user = await AuthService.login(
                req.body.login,
                req.body.email,
                req.body.password
            );
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
        delete res.cookie('refresh_token', null);
        res.status(200).json({
            message: 'Logged out successfully'
        });
    }

    async reset_link(req, res) {
        console.log(req.body);
    }

    async reset_confirm(req, res) {
        console.log(req.body);
    }
}

export default new AuthController();
