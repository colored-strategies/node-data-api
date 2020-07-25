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

//pass schema structor as a model to create a table
const Bread = mongoose.model("Bread", breadSchema);