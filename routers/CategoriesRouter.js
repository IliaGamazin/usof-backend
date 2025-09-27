import express from "express";
const router = express.Router();

import controller from "../controllers/CategoriesController.js";
import schema from "../validation/schemas/CategorySchema.js";

import authenticator from "../middleware/AuthMiddleware.js";
import validator from "../middleware/ValidationMiddleware.js";

router.get("/",
    authenticator.require_auth(),
    controller.get_categories
);

router.get("/:category_id",
    authenticator.require_auth(),
    controller.get_category
);

router.get("/:category_id/posts",
    authenticator.require_auth(),
    controller.get_category_posts
);

router.post("/",
    validator.validate(schema.update_category),
    authenticator.require_auth(["ADMIN"]),
    controller.new_category
);

router.patch("/:category_id",
    authenticator.require_auth(["ADMIN"]),
    controller.update_category
);

router.delete("/:category_id",
    authenticator.require_auth(["ADMIN"]),
    controller.delete_category
);

export default router;
