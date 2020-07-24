const seed = require("./seed");

const query = {};
const data = seed.findBread(query);





const output = () => {
    return data.then(d => {
        return [...d, { "addition": "added" }]
    });
}

exports.output = output;