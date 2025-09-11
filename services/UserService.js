const bcrypt = require("bcrypt");

const User = require("../models/User");
const CredentialsException = require("../exceptions/CredentialsException");
const PermissionException = require("../exceptions/PermissionException");
const ConflictException = require("../exceptions/ConflictException");

class UserService {
    async get_user(id) {
        const user = await User.find({ id });
        if (!user) {
            throw new CredentialsException("No user with id");
        }

        return {
            id: user.id,
            login: user.login,
            pfp: user.profile_picture,
            rating: user.rating,
            role: user.role
        };
    }

    async new_user(login, email, password, password_confirmation, role) {
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
            role: role
        })

        await user.save();
        return user;
    }

    async delete_user(id, requestor) {
        const user = await User.find({ id });
        if (!user) {
            throw new CredentialsException("No user with id");
        }

        if (requestor.id !== user.id && requestor.role !== "ADMIN") {
            throw new PermissionException("Permission denied");
        }

        await user.delete();
    }
}

module.exports = new UserService();
