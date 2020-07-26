
const Product = require("./product.model");

//requires: product names, other attributes are optional
//single document creation
const createAndSaveItem = (product) => {
    return new Promise((resolve, reject) => {
        //oracle data row = mongodb document
        const document = new Product(product);
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
const createManyItems = (arrayOfProduct) => {
    return new Promise((resolve, reject) => {
        Product.create(arrayOfProduct, (error, data) => {
            if (error) {
                console.log("Something went wrong", error.name);
                reject(error);
            }
            else {
                console.log(`Nicely saved ${data.length} types of Product, at ${new Date(Date.now())}`);
                resolve(data);
            }
        });
    })
};

//example query: {name:Lavash}
//return statements may be altered
const findItem = (query) => {
    return new Promise((resolve, reject) => {
        Product.find(query, (error, data) => {
            if (error) {
                console.log("Something went wrong", error.name);
                reject(error);
            }
            else {
                console.log(`${data.length} Product/s exist.`);
                resolve(data);
            }
        });
    })
};

//search with given query(where statement) then do the given update (set statement)
const findAndUpdate = (query, update) => {
    return new Promise((resolve, reject) => {
        const options = { new: true };
        Product.findOneAndUpdate(query, update, options, (error, data) => {
            if (error) {
                console.log("Something went wrong", error.name);
                reject(error);
            }
            else {
                console.log(`Updated Product as follows: ${data}`);
                resolve(data);
            }
        });
    })
};

const removeOneItem = (query, done) => {
    return new Promise((resolve, reject) => {
        Product.findOneAndRemove(query, (error, data) => {
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
        Product.deleteMany(query, (error, data) => {
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
    createAndSaveProduct: createAndSaveItem,
    createManyProducts: createManyItems,
    findProduct: findItem,
    findAndUpdateProduct: findAndUpdate,
    removeOneProduct: removeOneItem,
    removeAllMatchedProducts: removeAllMatches,
};

module.exports = controller;
