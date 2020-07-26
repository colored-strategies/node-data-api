const express = require("express");
const mongoose = require("mongoose");

//to read .env files
require("dotenv").config();

const logger = require("./utils/logger");
const breadController = require("./product/product.controller");




const app = express();
app.use(logger)


const connect = mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    //if you don't add this it will use MongoDB driver's deprecated
    //findOneAndUpdate instead of Mongoose's findOneAndUpdate
    useFindAndModify: false
});



// const seed = require("./seed");
// const datatables = require("./datatables");

//app.use(seed);

app.get("/", (req, res) => {
    res.send("Welcome my friend...");
});

app.get("/api/bread/find", async (req, res) => {
    const data = await breadController.findBread({});
    res.json(data);
})

// app.get("/api/seed", (req, res) => {
//     res.send(seed.preview);
// });

// //CREATE PROPER ROUTING FOR THE DB FUNCTIONS
// /*
// seed.createAndSaveBread
// seed.createManyBreads
// seed.findBread                  -GET
// seed.findAndUpdateBread
// seed.removeOneBread
// seed.removeAllMatchedBreadss
// */



// app.get("/api/data", async (req, res) => {
//     let params = {
//         draw: req.query.draw,
//         startIndex: req.query.draw,
//         length: req.query.length,
//     }
//     res.json(await datatables.output(params));
// })



const listener = app.listen(process.env.PORT || 3000, () => {
    console.log("Your app is listening on port " + listener.address().port);
});