const express = require("express");

const controller = require("../controllers/CommentsController");
const authenticator = require("../middleware/AuthMiddleware");
const router = express.Router();

router.get("/:comment_id",
    authenticator.require_auth(),
    controller.get_comment
);

// router.get("/:comment_id/like",
//     authenticator.require_auth(),
//     controller.get_comment_likes
// );
//
// router.post("/:comment_id/like",
//     authenticator.require_auth(),
//     controller.new_comment_like
// );

// router.patch("/:comment_id",
//     authenticator.require_auth(),
//     controller.update_comment
// );

router.delete("/:comment_id",
    authenticator.require_auth(),
    controller.delete_comment
);

// router.delete("/:comment_id",
//     authenticator.require_auth(),
//     controller.delete_comment_like
// );


module.exports = router;
