const mongoose = require("mongoose");
const dataTables = require('../utils/dataTablePlugin')

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
    createdDate: { type: Date, default: Date.now }
});

schema.method('toClient', function() {
    var obj = this.toObject();

    //Rename fields
    obj.id = obj._id;
    delete obj._id;

    return obj;
});

schema.plugin(dataTables);

module.exports = mongoose.model("Product", schema);
