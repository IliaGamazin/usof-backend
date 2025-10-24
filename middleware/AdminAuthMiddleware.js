import JwtService from "../services/JwtService.js";
import User from "../models/User.js";

class AdminAuthMiddleware {
    static async authenticate(req, res, next) {
        try {
            const refreshToken = req.cookies.refresh_token;

            if (!refreshToken) {
                return res.status(401).json({
                    error: 'Please login first'
                });
            }

            const decoded = JwtService.verify_refresh_token(refreshToken);
            const user = await User.find({id: decoded.id});

            if (!user) {
                return res.status(401).json({
                    error: 'User not found'
                });
            }

            req.user = {
                id: user.id,
                email: user.email,
                role: user.role
            };
            next();
        }
        catch (error) {
            return res.status(401).json({
                error: 'Invalid or expired session. Please login again.'
            });
        }
    }

    static authorize(roles = []) {
        return (req, res, next) => {
            try {
                if (!req.user) {
                    return res.status(401).json({
                        error: 'Authentication required'
                    });
                }

                if (roles.length === 0) {
                    return next();
                }

                const role = req.user.role;
                if (!role || !roles.includes(role)) {
                    return res.status(403).json({
                        error: 'Admin access only'
                    });
                }
                next();
            } catch (error) {
                return res.status(500).json({
                    error: 'Authorization error'
                });
            }
        };
    }

    static require_auth(roles = []) {
        return [
            AdminAuthMiddleware.authenticate,
            AdminAuthMiddleware.authorize(roles)
        ];
    }
}

export default AdminAuthMiddleware;
