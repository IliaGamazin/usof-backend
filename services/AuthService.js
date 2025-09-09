const bcrypt = require("bcrypt");

const User = require("../models/User");
const ConflictException = require("../exceptions/ConflictException");
const CredentialsException = require("../exceptions/CredentialsException");
const JwtService = require("./JwtService");

class AuthService {
    async register(login, email, password, password_confirmation) {
        const users = await User.get_all({
            login: login,
            email: email,
        });

        console.log(users);

        if (users.length > 0) {
            throw new ConflictException("User already exists");
        }

        const hash = await bcrypt.hash(password, 12);
        const user = new User({
            login,
            password: hash,
            email,
            profile_picture: null,
            rating: 0,
            role: "USER"
        })

        await user.save();
        return user;
    }

    async login(login, email, password) {
        const user = await User.find({login, email});

        if (!user) {
            throw new CredentialsException("No user with login/email");
        }

        const valid = await bcrypt.compare(password, user.password);
        if (!valid) {
            throw new CredentialsException("Incorrect password");
        }

        return user;
    }

    send_auth_response(res, user, message, statusCode = 200) {
        const payload = {
            id: user.id,
            login: user.login,
            email: user.email,
            role: user.role || 'USER'
        };

        const tokens = JwtService.generate_token_pair(payload);

        res.cookie('refresh_token', tokens.refresh_token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 24 * 60 * 60 * 1000
        });

        return res.status(statusCode).json({
            message,
            user: payload,
            access_token: tokens.access_token
        });
    }
}

module.exports = new AuthService();
