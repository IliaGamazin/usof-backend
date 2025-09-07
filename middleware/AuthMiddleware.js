const JwtService = require("../services/JwtService");
const User = require("../models/User");

class AuthMiddleware {
     async require_auth(req, res, next) {
        const header = req.headers.authorization;

        if (!header || !header.startsWith('Bearer ')) {
            const err = new Error('Access token required');
            err.status = 401;
            return next(err);
        }

        const token = header.split('Bearer ')[1];

        try {
            const decoded = JwtService.verify_access_token(token);
            if (!await User.exists({email: decoded.email})) {
                const err = new Error('User does not exist!');
                err.status = 401;
                return next(err);
            }

            req.user = {
                id: decoded.id,
                email: decoded.email,
                role: decoded.role,
            }

            next();
        }
        catch (error) {
            error.status = 401;
            next(error);
        }
    }
}

module.exports = new AuthMiddleware;
