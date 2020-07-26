const mongoose = require("mongoose");

const breadSchema = new mongoose.Schema({
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

module.exports = mongoose.model("Bread", breadSchema);
