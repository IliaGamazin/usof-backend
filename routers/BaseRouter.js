const express = require('express');

const AuthRouter = require("./AuthRouter");
const UsersRouter = require("./UsersRouter");
const PostsRouter = require("./PostsRouter");
const CategoriesRouter = require("./CategoriesRouter");
const CommentsRouter = require("./CommentsRouter");

const router = express.Router();

router.use("/auth", AuthRouter);
router.use("/users", UsersRouter);
router.use("/posts", PostsRouter);
router.use("/categories", CategoriesRouter);
router.use("/comments", CommentsRouter);

module.exports = router;
