const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
var cors = require("cors");

//to read .env files
require("dotenv").config();

const logger = require("./utils/logger");
const productSeeder = require("./product/product.seeder");

mongoose.Promise = global.Promise;

const app = express();
app.use(cors());
app.use(logger);
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);

const connect = mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    //if you don't add this it will use MongoDB driver's deprecated
    //findOneAndUpdate instead of Mongoose's findOneAndUpdate
    useFindAndModify: false,
});

app.get("/", (req, res) => {
    res.send("Welcome my friend...");
});


require('./routes/datatable')(app);

//#region seeder

//! TODO : seeder pathlerini bu dosyanın dışına taşı
app.get("/seeder/product", async (req, res) => {
    productSeeder.seed();
    res.send("its all good man");
});

//#endregion seeder

const listener = app.listen(process.env.PORT || 3000, () => {
    console.log("Your app is listening on port " + listener.address().port);
});
