import express from "express";
import cookies from "cookie-parser";
import { createServer } from "node:http";
import exception_handler from "./middleware/ExceptionHandler.js";
import { config } from 'dotenv';

config();

import router from "./routers/BaseRouter.js";

const app = express();
const http = createServer(app);

app.use(cookies());
app.use(express.json({limit: '2mb'}));
app.use(express.urlencoded({ extended: true }));

app.use("/api", router);

app.use(exception_handler);

http.listen(8080, () => {
    console.log("Listening on 8080");
});
