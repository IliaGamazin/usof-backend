import bcrypt from "bcrypt";

import User from "../models/User.js";
import PermissionException from "../exceptions/PermissionException.js";
import ConflictException from "../exceptions/ConflictException.js";
import NotFoundException from "../exceptions/NotFoundException.js";

import FileService from "./FileService.js";

class UserService {
    async get_user(id) {
        const user = await User.find({ id });
        if (!user) {
            throw new NotFoundException("No user with id");
        }

        return {
            id: user.id,
            login: user.login,
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
            pfp: user.profile_picture,
            rating: user.rating,
            role: user.role,
            created_at: user.created_at
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

    async update_user(id, login, firstname, lastname) {
        if (login !== undefined && login !== null) {
            const same_login = await User.find({ login });
            if (same_login && same_login.id != id) {
                throw new ConflictException("User with login already exists");
            }
        }

        const user = await User.find({ id });
        if (!user) {
            throw new NotFoundException("No user with id");
        }

        if (!login || login.trim().length === 0) {
            throw new ConflictException("User must have a login");
        }

        if (!firstname || firstname.trim().length === 0) {
            throw new ConflictException("User must have a firstname");
        }

        if (!lastname || lastname.trim().length === 0) {
            throw new ConflictException("User must have a lastname");
        }

        user.login = login;
        user.firstname = firstname;
        user.lastname = lastname;

        await user.save();
        return user;
    }

    async set_avatar(id, avatar) {
        const user = await User.find({ id });
        if (!user) {
            throw new NotFoundException("No user with id");
        }

        const info = await FileService.save_image(avatar, 'avatars', id);
        user.profile_picture = info.url;

        await user.save();
        return info.url;
    }


    async delete_user(id, requestor) {
        const user = await User.find({ id });
        if (!user) {
            throw new NotFoundException("No user with id");
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

export default new UserService();
