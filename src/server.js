const express = require("express");
const app = express();

//to read .env files
require("dotenv").config();

const seed = require("./seed");
const datatables = require("./datatables");

app.use(logger);
//app.use(seed);

app.get("/", (req, res) => {
    res.send("Welcome my friend...");
});

app.get("/api/seed", (req, res) => {
    res.send(seed.preview);
});

//CREATE PROPER ROUTING FOR THE DB FUNCTIONS
/*
seed.createAndSaveBread
seed.createManyBreads
seed.findBread                  -GET
seed.findAndUpdateBread
seed.removeOneBread
seed.removeAllMatchedBreadss
*/

app.get("/api/data/findBread", async (req, res) => {
    const data = await seed.findBread({});
    res.json(data);
})

app.get("/api/data/:draw/:startIndex/:length", async (req, res) => {
    res.json(await datatables.output(req.params));
})

function logger(req, res, next) {
    console.log(req.method, req.path, "-", req.ip);
    next();
}

const listener = app.listen(process.env.PORT || 3000, () => {
    console.log("Your app is listening on port " + listener.address().port);
});