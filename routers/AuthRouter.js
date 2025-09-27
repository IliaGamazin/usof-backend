import express from "express";
const router = express.Router();

import controller from "../controllers/AuthController.js";
import schema from "../validation/schemas/AuthSchema.js";

import validator from "../middleware/ValidationMiddleware.js";
import authenticator from "../middleware/AuthMiddleware.js";

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

export default router;
