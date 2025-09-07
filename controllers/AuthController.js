const User = require("../models/User");

class AuthController {
    async register(req, res) {
        console.log(req.body);
        const users = User.get_all({
            login: req.body.login,
            email: req.body.email
        });

        console.log(users);

        if (users.length === 0) {
            
        }
    }

    async login(req, res) {
        console.log(req.body);
    }

    async logout(req, res) {
        console.log(req.body);
    }

    async reset_link(req, res) {
        console.log(req.body);
    }

    async reset_confirm(req, res) {
        console.log(req.body);
    }
}

module.exports = new AuthController();