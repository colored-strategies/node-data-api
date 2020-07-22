const mongoose = require("mongoose");


let preview = "MONGOOSE rules";

const connect = mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    //if you don't add this it will use MongoDB driver's deprecated
    //findOneAndUpdate instead of Mongoose's findOneAndUpdate
    useFindAndModify: false
});



const breadTagList = ["New sale", "Done"];
//console.log(breadTagList[Math.round(Math.random() * 1)]);


//DOESN'T GENERATE NEW NUMBER FOR EACH CALL !!!!! CIRCLE BACK TO THIS
const generateAmount = (limit) => Math.round(Math.random() * limit);

//oracle schema = mongodb user		oracle table = mongodb schema
const breadSchema = new mongoose.Schema({
    name: { type: String, required: true },
    stock: { type: Number, default: generateAmount(9999) },
    sales: { type: Number, default: generateAmount(9999) },
    category: { type: String, default: "IDK" },
    tag: { type: String, default: breadTagList[generateAmount(1)] },
    img: { type: String, default: "IDK" },
    thumb: { type: String, default: "IDK" },
    createdDate: { type: Date, default: Date.now }
});

//pass schema structor as a model to create a table
const Bread = mongoose.model("Bread", breadSchema);

//Delete the collection
//Bread.collection.drop();


const createAndSaveBread = (breadObj) => {
    //oracle data row = mongodb document
    const document = new Bread(breadObj);
    //oracle insert = mongodb save + some extra actions
    document.save(function (error, data) {
        if (error) return console.log("Something went wrong", error.name);
        else {
            console.log(`Nicely saved ${data.name}, at ${new Date(Date.now())}`);
        }
    });
};





////////////////////////////////// TEST ///////////////////////////////////
const dataSet = [
    "Aish merahrah",
    "Baba",
    "Bagel",
    "Bammy",
    "Chapati",
    "Ciabatta",
    "Dorayaki",
    "Farl",
    "Hardtack",
    "Injera",
    "Kamir",
    "Lavash "
];

const populate = (dataSet) => {
    for (let i = 0; i < dataSet.length; i++) {
        createAndSaveBread(
            { name: dataSet[i] }
        );
    }
}

//populate(dataSet);

preview = { breadSchema };


exports.preview = preview;