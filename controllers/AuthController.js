class AuthController {
    async register(req, res) {
        console.log(req.body);
        res.json(req.body);
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