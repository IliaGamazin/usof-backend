const express = require("express");
const router = express.Router();

const controller = require("../controllers/UsersController");
const schema = require("../validation/schemas/UserSchema");

const validator = require("../middleware/ValidationMiddleware");
const authenticator = require("../middleware/AuthMiddleware");

router.get("/",
    authenticator.require_auth(["ADMIN"]),
    controller.get_users);
router.get("/:user_id", controller.get_user);
router.post("/",
    validator.validate(schema.new_user),
    authenticator.require_auth(["ADMIN"]),
    controller.new_user);
// router.patch("/:user_id");
// router.patch("/avatar");
router.delete("/:user_id",
    authenticator.require_auth(),
    controller.delete_user);


module.exports = router;
