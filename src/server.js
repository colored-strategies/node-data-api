const express = require("express");
const app = express();

//to read .env files
require("dotenv").config();

const seed = require("./seed").preview;

app.use(logger);
//app.use(seed);

app.get("/", function (req, res) {
    res.send("Welcome my friend...");
});

app.get("/api/seed", function (req, res) {
    res.send(seed);
});

function logger(req, res, next) {
    console.log(req.method, req.path, "-", req.ip);
    next();
}

const listener = app.listen(process.env.PORT || 3000, function () {
    console.log("Your app is listening on port " + listener.address().port);
});