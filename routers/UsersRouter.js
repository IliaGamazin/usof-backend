const express = require("express");
const router = express.Router();

const controller = require("../controllers/UsersController");
const upload = require('../middleware/UploadMiddleware');
const schema = require("../validation/schemas/UserSchema");

const validator = require("../middleware/ValidationMiddleware");
const authenticator = require("../middleware/AuthMiddleware");

router.get("/",
    authenticator.require_auth(["ADMIN"]),
    controller.get_users
);
router.get("/:user_id",
    authenticator.require_auth(),
    controller.get_user
);
router.post("/",
    validator.validate(schema.new_user),
    authenticator.require_auth(["ADMIN"]),
    controller.new_user
);

router.patch("/avatar",
    authenticator.require_auth(),
    upload.single("avatar"),
    controller.set_avatar
);

router.patch("/:user_id",
    validator.validate(schema.update_user),
    authenticator.require_auth(),
    controller.update_user
);

router.delete("/:user_id",
    authenticator.require_auth(),
    controller.delete_user
);

module.exports = router;
