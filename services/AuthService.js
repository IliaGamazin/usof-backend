import bcrypt from "bcrypt";

import User from "../models/User.js";
import ConflictException from "../exceptions/ConflictException.js";
import CredentialsException from "../exceptions/CredentialsException.js";
import NotFoundException from "../exceptions/NotFoundException.js";
import JwtService from "./JwtService.js";

class AuthService {
    async register(login, firstname, lastname, email, password, password_confirmation) {
        const users = await User.get_all({
            login: login,
            email: email,
        });

        if (users.length > 0) {
            throw new ConflictException("User already exists");
        }

        if (password !== password_confirmation) {
            throw new CredentialsException("Passwords do not match");
        }

        const hash = await bcrypt.hash(password, 12);
        const user = new User({
            login,
            firstname,
            lastname,
            email,
            password: hash,
            profile_picture: null,
            rating: 0,
            role: "USER"
        });

        await user.save();
        return user;
    }

    async login(login, email, password) {
        const user = await User.find({login, email});

        if (!user) {
            throw new NotFoundException("No user with login/email");
        }

        const valid = await bcrypt.compare(password, user.password);
        if (!valid) {
            throw new CredentialsException("Incorrect password");
        }

        return user;
    }

    async reset_link(email) {
        const user = await User.find({ email });
        if (!user) {
            return { message: "If the email exists, a reset link has been sent" };
        }

        const reset_token = JwtService.generate_password_reset_token({
            id: user.id,
            email: user.email
        });

        console.log(`Password reset token for ${email}: ${reset_token}`);
        console.log(`Reset link: http://localhost:3000/password-reset/${reset_token}`);

        return { message: "If the email exists, a reset link has been sent" };
    }

    async reset_confirm(token, new_password) {
        const decoded = JwtService.verify_password_reset_token(token);

        const user = await User.find({ id: decoded.id });
        if (!user) {
            throw new NotFoundException("User not found");
        }

        user.password = await bcrypt.hash(new_password, 12);
        await user.save();

        return { message: "Password reset successfully" };
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

export default new AuthService();
