const express = require("express");
const exception_handler = require("./middleware/ExceptionHandler");
const { createServer } = require("node:http");

const router = require("./routers/BaseRouter");

const app = express();
const http = createServer(app);

app.use(express.json({limit: '2mb'}));
app.use(express.urlencoded({ extended: true }));

app.use("/api", router);

app.use(exception_handler);

http.listen(8080, () => {
    console.log("Listening on 8080");
});
