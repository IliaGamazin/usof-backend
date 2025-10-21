import express from "express";
import cookies from "cookie-parser";
import { createServer } from "node:http";
import exception_handler from "./middleware/ExceptionHandler.js";
import { config } from 'dotenv';
import cors from 'cors';

config();

import router from "./routers/BaseRouter.js";

const app = express();
const http = createServer(app);


const corsOptions = {
    origin: true,
    credentials: true
};
app.use('/vault', express.static('vault'));

app.use(cors(corsOptions));
app.use(cookies());
app.use(express.json({limit: '2mb'}));
app.use(express.urlencoded({ extended: true }));

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
