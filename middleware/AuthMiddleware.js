import JwtService from "../services/JwtService.js";

class AuthMiddleware {
     static authenticate(req, res, next) {
        try {
            const authHeader = req.headers.authorization;

            if (!authHeader) {
                return res.status(401).json({
                    error: 'Access token is required'
                });
            }

            const token = authHeader.split(' ')[1];

            if (!token) {
                return res.status(401).json({
                    error: 'Access token is required'
                });
            }
            req.user = JwtService.verify_access_token(token);
            next();
        }
        catch (error) {
            next(error);
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
                        error: 'Insufficient permissions'
                    });
                }
                next();
            }
            catch (error) {
                return res.status(500).json({
                    error: 'Authorization error'
                });
            }
        };
    }

    static require_auth(roles = []) {
        return [
            AuthMiddleware.authenticate,
            AuthMiddleware.authorize(roles)
        ];
    }
}

export default AuthMiddleware;
