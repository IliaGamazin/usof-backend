const express = require("express");

const controller = require("../controllers/AuthController");
const router = express.Router();
const validator = require("../middleware/ValidationMiddleware");
const schema = require("../validation/schemas/AuthSchema");

router.post("/register",
    validator.validate(schema.register),
    controller.register);
router.post("/login",
    validator.validate(schema.login),
    controller.login);
router.post("/logout", controller.logout);
router.post("/password-reset", controller.reset_link);
router.post("/password-reset/:confirm_token", controller.reset_confirm);

module.exports = router;