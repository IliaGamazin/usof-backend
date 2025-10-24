import express from "express";
import cookies from "cookie-parser";
import { createServer } from "node:http";
import exception_handler from "./middleware/ExceptionHandler.js";
import { config } from 'dotenv';
import cors from 'cors';
import {Resource, Database } from '@adminjs/sql'
import Plugin from '@adminjs/express'
import AdminJS from 'adminjs'
import router from "./routers/BaseRouter.js";
import {admin} from "./adminjs.config.js"
import authenticator from "./middleware/AdminAuthMiddleware.js";
config();
AdminJS.registerAdapter({
    Database,
    Resource,
});

const start = async() => {
    const app = express();
    const http = createServer(app);
    const corsOptions = {
        origin: true,
        credentials: true
    };

    app.use(cors(corsOptions));
    app.use(cookies());
    app.use(express.json({limit: '2mb'}));
    app.use(express.urlencoded({ extended: true }));

    admin.watch();

    const admin_router = Plugin.buildRouter(admin)
    app.use(
        admin.options.rootPath,
        authenticator.require_auth(["ADMIN"]),
        admin_router
    );

    app.use('/vault', express.static('vault'));

    app.use("/api", router);
    app.use("/", (req, res) => {
        res.status(404).json({
            message: "Route not found",
            path: req.originalUrl
        });
    });
    app.use(exception_handler);

    http.listen(8080, () => {
        console.log("Listening on 8080");
    });
}

start();
