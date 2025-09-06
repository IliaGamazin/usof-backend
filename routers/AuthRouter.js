const express = require("express");

const controller = require("../controllers/AuthController");
const router = express.Router();

router.post("/register", controller.register);
router.post("/login", controller.login);
router.post("/logout", controller.logout);
router.post("/password-reset", controller.reset_link);
router.post("/password-reset/:confirm_token", controller.reset_confirm);

module.exports = router;