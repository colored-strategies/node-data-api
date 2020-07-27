const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require('body-parser')

//to read .env files
require("dotenv").config();

const logger = require("./utils/logger");
const productController = require("./product/product.controller");
const productModel = require("./product/product.model");

mongoose.Promise = global.Promise



const app = express();
app.use(logger)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));


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

app.get("/datatables/product", async (req, res) => {
    
    console.log(">>>>: req.aaaaaaaa", req.query)
    productModel.dataTables({
        limit: req.query.length,
        skip: req.query.start,
        order: req.query.order,
        columns: req.query.columns
      }).then(function (table) {
      console.log(">>>>: table", table)
        res.json({
          data: table.data,
          recordsFiltered: table.total,
          recordsTotal: table.total
        });
      });
    
    // const data = await productController.findProduct({});
    // res.json(data);
})

// app.get("/api/seed", (req, res) => {
//     res.send(seed.preview);
// });



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