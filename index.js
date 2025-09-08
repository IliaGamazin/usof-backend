const express = require("express");
const cookies = require("cookie-parser");
const { createServer } = require("node:http");
const exception_handler = require("./middleware/ExceptionHandler");

require('dotenv').config();

const router = require("./routers/BaseRouter");

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
