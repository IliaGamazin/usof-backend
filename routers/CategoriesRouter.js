const express = require("express");
const router = express.Router();

const controller = require("../controllers/CategoriesController");
const schema = require("../validation/schemas/CategorySchema");

const authenticator = require("../middleware/AuthMiddleware");
const validator = require("../middleware/ValidationMiddleware");

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

module.exports = router;
