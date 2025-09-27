import express from "express";

import controller from "../controllers/SubscriptionsController.js";
import authenticator from "../middleware/AuthMiddleware.js";
const router = express.Router();

router.get("/",
    authenticator.require_auth(),
    controller.get_subscriptions
);

router.post("/:post_id",
    authenticator.require_auth(),
    controller.add_subscription
);

router.delete("/:post_id",
    authenticator.require_auth(),
    controller.delete_subscription
);

export default router;
