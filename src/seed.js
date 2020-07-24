const mongoose = require("mongoose");


let preview = "MONGOOSE rules";

const connect = mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    //if you don't add this it will use MongoDB driver's deprecated
    //findOneAndUpdate instead of Mongoose's findOneAndUpdate
    useFindAndModify: false
});
/*
for (let i = 0; i < 10; i++)
    console.log(Math.random() * 10);*/

const breadTagList = ["New sale", "Done"];

//generates values to populate bread fields
const generateAmount = (limit) => {
    let value = Math.round(Math.random() * limit);
    //console.log(value);
    return value;
}

//oracle schema = mongodb user		oracle table = mongodb schema
const breadSchema = new mongoose.Schema({
    name: { type: String, required: true },
    stock: {
        type: Number, default: () => {
            return Math.round(Math.random() * 10000);
        }
    },
    sales: {
        type: Number, default: () => {
            return Math.round(Math.random() * 10000);
        }
    },
    category: { type: String, default: "IDK" },
    tag: {
        type: String, default: () => {
            return breadTagList[Math.round(Math.random())];
        }
    },
    img: { type: String, default: "IDK" },
    thumb: { type: String, default: "IDK" },
    createdDate: { type: Date, default: Date.now }
});

//pass schema structor as a model to create a table
const Bread = mongoose.model("Bread", breadSchema);

//requires: bread names, other attributes are optional
//single document creation
const createAndSaveItem = (breadObj) => {
    return new Promise((resolve, reject) => {
        //oracle data row = mongodb document
        const document = new Bread(breadObj);
        //oracle insert = mongodb save + some extra actions
        document.save((error, data) => {
            if (error) {
                console.log("Something went wrong", error.name);
                reject(error);
            }
            else {
                console.log(`Nicely saved ${data.name}, at ${new Date(Date.now())}`);
                resolve(data);
            }
        });
    })
};

//multiple document creation
const createManyItems = (arrayOfBread) => {
    return new Promise((resolve, reject) => {
        Bread.create(arrayOfBread, (error, data) => {
            if (error) {
                console.log("Something went wrong", error.name);
                reject(error);
            }
            else {
                console.log(`Nicely saved ${data.length} types of bread, at ${new Date(Date.now())}`);
                resolve(data);
            }
        });
    })
};

//example query: {name:Lavash}
//return statements may be altered
const findItem = (query) => {
    return new Promise((resolve, reject) => {
        Bread.find(query, (error, data) => {
            if (error) {
                console.log("Something went wrong", error.name);
                reject(error);
            }
            else {
                console.log(`${data.length} bread/s exist.`);
                resolve(data);
            }
        });
    })
};

//search with given query(where statement) then do the given update (set statement)
const findAndUpdate = (query, update) => {
    return new Promise((resolve, reject) => {
        const options = { new: true };
        Bread.findOneAndUpdate(query, update, options, (error, data) => {
            if (error) {
                console.log("Something went wrong", error.name);
                reject(error);
            }
            else {
                console.log(`Updated bread as follows: ${data}`);
                resolve(data);
            }
        });
    })
};

const removeOneItem = (query, done) => {
    return new Promise((resolve, reject) => {
        Bread.findOneAndRemove(query, (error, data) => {
            if (error) {
                console.log("Something went wrong", error.name);
                reject(error);
            } else {
                console.log(`Item is removed!`);
                resolve(data);
            }
        });
    })
};

//return statements may be altered
const removeAllMatches = (query) => {
    return new Promise((resolve, reject) => {
        Bread.deleteMany(query, (error, data) => {
            if (error) {
                console.log("Something went wrong", error.name);
                reject(error);
            }
            else {
                console.log(`${data.deletedCount} item/s is/are removed!`);
                resolve(data);
            }
        });
    })
};





////////////////////////////////// TEST ///////////////////////////////////
const dataSet = [
    { name: "Aish merahrah" },
    { name: "Baba" },
    { name: "Bagel" },
    { name: "Bammy" },
    { name: "Chapati" },
    { name: "Ciabatta" },
    { name: "Dorayaki" },
    { name: "Farl" },
    { name: "Hardtack" },
    { name: "Injera" },
    { name: "Kamir" },
    { name: "Lavash " }
];

//generate data with single item at each step
const populateSingle = (dataSet) => {
    for (let i = 0; i < dataSet.length; i++) {
        createAndSaveItem({ name: dataSet[i].name });
    }
}

//let the mongoose handle bundle item creation
const populateMultiple = (dataSet) => {
    createManyItems(dataSet);
}

//Delete the collection
//Bread.collection.drop();

//Create the collection with sample data
//populateSingle(dataSet);
//populateMultiple(dataSet);

preview = "Are you ready to dive in?!";

exports.preview = preview;
exports.Bread = Bread;
exports.createAndSaveBread = createAndSaveItem;
exports.createManyBreads = createManyItems;
exports.findBread = findItem;
exports.findAndUpdateBread = findAndUpdate;
exports.removeOneBread = removeOneItem;
exports.removeAllMatchedBreads = removeAllMatches;