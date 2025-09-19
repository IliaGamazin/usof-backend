const express = require("express");

const controller = require("../controllers/CommentsController");
const authenticator = require("../middleware/AuthMiddleware");
const router = express.Router();

// router.get("/:comment_id",
//     authenticator.require_auth(),
//     controller.get_comment
// );
//
// router.get("/:comment_id/like",
//     authenticator.require_auth(),
//     controller.get_comment_likes
// );
//
// router.get("/:comment_id/like",
//     authenticator.require_auth(),
//     controller.get_comment_likes
// );


module.exports = router;
