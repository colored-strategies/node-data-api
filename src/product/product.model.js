const mongoose = require("mongoose");
const dataTables = require("../utils/dataTablePlugin");

const productImgRoot = "/images/products";

const schema = new mongoose.Schema({
  Name: { type: String, required: true },
  Description: { type: String },
  Sales: { type: Number },
  Stock: { type: Number },
  Category: { type: String },
  Tag: { type: String },
  Check: { type: String },
  ImageP: { type: String },
  Thumb: { type: String },
  Date: { type: String },
  createdDate: { type: Date, default: Date.now },
});

schema.set("toJSON", {
  transform: function (doc, ret, options) {
    ret.id = ret._id;
    ret.ImageP = `${process.env.API_URL}${productImgRoot}${ret.ImageP}`;
    ret.Thumb = `${process.env.API_URL}${productImgRoot}${ret.Thumb}`;
    delete ret._id;
    delete ret.__v;
  },
});

schema.plugin(dataTables);

module.exports = mongoose.model("Product", schema);
