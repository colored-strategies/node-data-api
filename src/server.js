const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require('body-parser')
var cors = require('cors')

//to read .env files
require("dotenv").config();

const logger = require("./utils/logger");
const productModel = require("./product/product.model");
const productSeeder = require("./product/product.seeder");

mongoose.Promise = global.Promise



const app = express();
app.use(cors())
app.use(logger)
app.use(express.static(__dirname + '/public'));
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


app.get("/", (req, res) => {
    res.send("Welcome my friend...");
});

//#region datatable/product
app.get("/datatables/product", async (req, res) => {
    productForDatatable(req.query, res);
});

app.post("/datatables/product", async (req, res) => {
    productForDatatable(req.body, res);
})

productForDatatable = async (params, res) => {
    productModel.dataTables({
        limit: params.length,
        skip: params.start,
        order: params.order,
        columns: params.columns,
        search: {
            ...params.search,
            fields: [
                "Name",
                "Description",
                "Category",
                "Tag"
            ]
        }
    })
        .then(function (table) {

            res.json({
                draw: params.draw,
                data: table.data.map(x => {
                    return {
                        ...x._doc,
                        ImageP: `${process.env.API_URL}${process.env.PRODUCT_IMG_ROOT}${x._doc.ImageP}`,
                        Thumb: `${process.env.API_URL}${process.env.PRODUCT_IMG_ROOT}${x._doc.Thumb}`
                    }
                }),
                recordsFiltered: table.total,
                recordsTotal: table.total
            })
        }).catch((error) => {
            console.log("error.... ", error)
        });
}
//#endregion datatalbe/product

//#region seeder 

//! TODO : seeder pathlerini bu dosyanın dışına taşı
app.get("/seeder/product", async (req, res) => {
    productSeeder.seed();
    res.send("its all good man")
})

//#endregion seeder


const listener = app.listen(process.env.PORT || 3003, () => {
    console.log("Your app is listening on port " + listener.address().port);
});


