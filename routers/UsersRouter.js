import express from "express";
const router = express.Router();

import controller from "../controllers/UsersController.js";
import upload from '../middleware/UploadMiddleware.js';
import schema from "../validation/schemas/UserSchema.js";

import validator from "../middleware/ValidationMiddleware.js";
import authenticator from "../middleware/AuthMiddleware.js";

router.get("/",
    controller.get_users
);

router.get("/me",
    authenticator.require_auth(),
    controller.get_me
);

router.get("/:user_id",
    controller.get_user
);

router.post("/",
    validator.validate(schema.new_user),
    authenticator.require_auth(["ADMIN"]),
    controller.new_user
);

router.patch("/avatar",
    authenticator.require_auth(),
    upload.single("avatar"),
    controller.set_avatar
);

router.patch("/:user_id",
    authenticator.require_auth(),
    controller.update_user
);

router.delete("/:user_id",
    authenticator.require_auth(),
    controller.delete_user
);

export default router;
