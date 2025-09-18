const bcrypt = require("bcrypt");

const User = require("../models/User");
const CredentialsException = require("../exceptions/CredentialsException");
const PermissionException = require("../exceptions/PermissionException");
const ConflictException = require("../exceptions/ConflictException");

const FileService = require("./FileService");

class UserService {
    async get_user(id) {
        const user = await User.find({ id });
        if (!user) {
            throw new CredentialsException("No user with id");
        }

        return {
            id: user.id,
            login: user.login,
            firstname: user.firstname,
            lastname: user.lastname,
            pfp: user.profile_picture,
            rating: user.rating,
            role: user.role
        };
    }

    async new_user(login, firstname, lastname, email, password, password_confirmation, role) {
        const users = await User.get_all({
            login: login,
            email: email,
        });

        if (users.length > 0) {
            throw new ConflictException("User already exists");
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
            role: role
        })

        await user.save();
        return user;
    }

    async update_user(id, login, firstname, lastname, password, user_role) {
        if (login !== undefined && login !== null) {
            const same_login = await User.find({ login });
            if (same_login) {
                throw new ConflictException("User with login already exists");
            }
        }

        const user = await User.find({ id });
        if (!user) {
            throw new CredentialsException("No user with id");
        }

        if (user_role !== "ADMIN") {
            const valid = await bcrypt.compare(password, user.password);
            if (!valid) {
                throw new CredentialsException("Incorrect password");
            }
        }

        if (login !== undefined && login !== null) {
            user.login = login;
        }

        if (firstname !== undefined && firstname !== null) {
            user.firstname = firstname;
        }

        if (lastname !== undefined && lastname !== null) {
            user.lastname = lastname;
        }

        await user.save();
        return user;
    }

    async set_avatar(id, avatar) {
        const user = await User.find({ id });
        if (!user) {
            throw new CredentialsException("No user with id");
        }

        const info = await FileService.save_image(avatar, 'avatars', id);
        user.profile_picture = info.url;

        await user.save();
        return info.url;
    }


    async delete_user(id, requestor) {
        const user = await User.find({ id });
        if (!user) {
            throw new CredentialsException("No user with id");
        }

        if (requestor.id !== user.id && requestor.role !== "ADMIN") {
            throw new PermissionException("Permission denied");
        }

        if (user.profile_picture) {
            const filename = user.profile_picture.split('/').pop();
            await FileService.delete_file('avatars', filename);
        }

        await user.delete();
    }
}

module.exports = new UserService();
