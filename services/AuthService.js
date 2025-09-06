const jwt = require('jsonwebtoken');

class AuthService {
    generate_token(user) {
        jwt.sign({
            id: user.id,
            email: user.email,
            role: user.role,
        }, process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN || '20m'}
        );
    }
}