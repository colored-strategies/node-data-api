const mongoose = require("mongoose");


let preview = "MONGOOSE rules";

const connect = mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    //if you don't add this it will use MongoDB driver's deprecated
    //findOneAndUpdate instead of Mongoose's findOneAndUpdate
    useFindAndModify: false
});




const mustData = require("./server.json");

//let the mongoose handle bundle item creation
const populateMultiple = (dataSet) => {
    //createManyItems(dataSet);
    //console.log([dataSet.data]);
    createManyItems(dataSet.data);
}

//Delete the collection
//Bread.collection.drop();

//Set up the sample data
//setSampleData(dataSet);

//Create the collection with sample data
//populateSingle(dataSet);
//populateMultiple(dataSet);
//populateMultiple(mustData);

preview = "Are you ready to dive in?!";

exports.preview = preview;
