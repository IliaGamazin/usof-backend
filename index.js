const express = require("express");
const path = require("node:path");
const {createServer} = require("node:http");

const router = require("./routers/BaseRouter");

const app = express();
const http = createServer(app);

app.use(express.json({limit: '2mb'}));
app.use("/api", router);

http.listen(8080, () => {
    console.log("Listening on 8080");
});
