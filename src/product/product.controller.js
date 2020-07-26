
const model = require("./product.model");

//requires: item names, other attributes are optional
//single document creation
const createAndSaveItem = (item) => {
    return new Promise((resolve, reject) => {
        //oracle data row = mongodb document
        const document = new model(item);
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
const createManyItems = (arrayOfmodel) => {
    return new Promise((resolve, reject) => {
        model.create(arrayOfmodel, (error, data) => {
            if (error) {
                console.log("Something went wrong", error.name);
                reject(error);
            }
            else {
                console.log(`Nicely saved ${data.length} types of model, at ${new Date(Date.now())}`);
                resolve(data);
            }
        });
    })
};

//example query: {name:Lavash}
//return statements may be altered
const findItem = (query) => {
    return new Promise((resolve, reject) => {
        model.find(query, (error, data) => {
            if (error) {
                console.log("Something went wrong", error.name);
                reject(error);
            }
            else {
                console.log(`${data.length} model/s exist.`);
                resolve(data);
            }
        });
    })
};

//search with given query(where statement) then do the given update (set statement)
const findAndUpdate = (query, update) => {
    return new Promise((resolve, reject) => {
        const options = { new: true };
        model.findOneAndUpdate(query, update, options, (error, data) => {
            if (error) {
                console.log("Something went wrong", error.name);
                reject(error);
            }
            else {
                console.log(`Updated model as follows: ${data}`);
                resolve(data);
            }
        });
    })
};

const removeOneItem = (query, done) => {
    return new Promise((resolve, reject) => {
        model.findOneAndRemove(query, (error, data) => {
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
        model.deleteMany(query, (error, data) => {
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

const controller = {
    createAndSavemodel: createAndSaveItem,
    createManymodels: createManyItems,
    findmodel: findItem,
    findAndUpdatemodel: findAndUpdate,
    removeOnemodel: removeOneItem,
    removeAllMatchedmodels: removeAllMatches,
};

module.exports = controller;
