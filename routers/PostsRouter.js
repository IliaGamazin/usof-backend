import express from "express";
const router = express.Router();
import FavouritesRouter from "./FavouritesRouter.js";
import SubscriptionsRouter from "./SubscriptionsRouter.js";

import upload from '../middleware/UploadMiddleware.js';
import authenticator from "../middleware/AuthMiddleware.js";

import controller from "../controllers/PostsController.js";

router.use("/subscriptions", SubscriptionsRouter);
router.use("/favourite", FavouritesRouter);

router.get("/",
    controller.get_posts
);

router.get("/:post_id",
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
    upload.array("images"),
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

export default router;
