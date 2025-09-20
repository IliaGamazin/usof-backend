const express = require("express");

const controller = require("../controllers/FavouritesController");
const authenticator = require("../middleware/AuthMiddleware");
const router = express.Router();

router.post("/:post_id/favourite",
    authenticator.require_auth(),
    controller.add_favourite
);

module.exports = router;
