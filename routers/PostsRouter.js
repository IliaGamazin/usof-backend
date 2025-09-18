const express = require("express");
const router = express.Router();

const upload = require('../middleware/UploadMiddleware');
const schema = require("../validation/schemas/PostSchema");

const validator = require("../middleware/ValidationMiddleware");
const authenticator = require("../middleware/AuthMiddleware");

const controller = require("../controllers/PostsController");

router.get("/",
    authenticator.require_auth(),
    controller.get_posts
);

router.get("/:post_id",
    authenticator.require_auth(),
    controller.get_post
);

router.get("/:post_id/comments",
    authenticator.require_auth(),
    controller.get_post_comments
);

router.post("/:post_id/comments",
    authenticator.require_auth(),
    controller.new_post_comment
);

router.get("/:post_id/categories",
    authenticator.require_auth(),
    controller.get_post_categories
);

router.get("/:post_id/like",
    authenticator.require_auth(),
    controller.get_post_likes
);

router.post("/",
    authenticator.require_auth(),
    upload.array("images"),
    controller.new_post
);

router.post("/:post_id/like",
    authenticator.require_auth(),
    controller.new_post_like
);

router.patch("/:post_id",
    authenticator.require_auth(),
    controller.update_post
);

router.delete("/:post_id",
    authenticator.require_auth(),
    controller.delete_post
);

router.delete("/:post_id/like",
    authenticator.require_auth(),
    controller.delete_post_like
);

module.exports = router;
