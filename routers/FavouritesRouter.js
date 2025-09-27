import express from "express";

import controller from "../controllers/FavouritesController.js";
import authenticator from "../middleware/AuthMiddleware.js";
const router = express.Router();

router.get("/",
    authenticator.require_auth(),
    controller.get_favourites
);

router.post("/:post_id",
    authenticator.require_auth(),
    controller.add_favourite
);

router.delete("/:post_id",
    authenticator.require_auth(),
    controller.delete_favourite
);

export default router;
