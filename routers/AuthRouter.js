const express = require("express");
const router = express.Router();

const controller = require("../controllers/AuthController");
const schema = require("../validation/schemas/AuthSchema");

const validator = require("../middleware/ValidationMiddleware");
const authenticator = require("../middleware/AuthMiddleware");

router.post("/register",
    validator.validate(schema.register),
    controller.register
);
router.post("/login",
    validator.validate(schema.login),
    controller.login
);
router.post("/logout",
    authenticator.require_auth(),
    controller.logout
);
router.post("/password-reset", controller.reset_link);
router.post("/password-reset/:confirm_token", controller.reset_confirm);
router.post("/refresh", controller.refresh);

module.exports = router;
