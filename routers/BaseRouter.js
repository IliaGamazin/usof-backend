import express from 'express';

import AuthRouter from "./AuthRouter.js";
import UsersRouter from "./UsersRouter.js";
import PostsRouter from "./PostsRouter.js";
import CategoriesRouter from "./CategoriesRouter.js";
import CommentsRouter from "./CommentsRouter.js";

const router = express.Router();

router.use("/auth", AuthRouter);
router.use("/users", UsersRouter);
router.use("/posts", PostsRouter);
router.use("/categories", CategoriesRouter);
router.use("/comments", CommentsRouter);

export default router;
