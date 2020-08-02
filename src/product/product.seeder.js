const model = require("./product.model");
const data = require("./_initial.data.json");

const seed = () => {
  try {
    model.collection.drop();
  } catch (error) {}

  model.create(data, (error, data) => {
    if (error) {
      console.log("Something went wrong", error.name);
    } else {
      console.log(
        `Nicely saved ${data.length} types of model, at ${new Date(Date.now())}`
      );
    }
  });
};

const seeder = {
  seed,
};

module.exports = seeder;
