const bcrypt = require("bcrypt");

const User = require("../models/User");
const ConflictException = require("../exceptions/ConflictException");

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
}

module.exports = new AuthService();
