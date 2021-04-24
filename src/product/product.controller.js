const Model = require("./product.model");
const initialData = require("./_initial.data.json");

module.exports = {
  getAllForDatatable: async (req, res) => {
    Model.dataTables({
      limit: req.query.length,
      skip: req.query.start,
      order: req.query.order,
      columns: req.query.columns,
      search: {
        ...req.query.search,
        fields: ["Name"],
        //fields: ["Name", "Description", "Category", "Tag"],
      },
    })
      .then(function (table) {
        res.json({
          draw: req.query.draw,
          data: table.data,
          recordsFiltered: table.total,
          recordsTotal: table.total,
        });
      })
      .catch((error) => {
        console.log("error.... ", error);
      });
  },

  // Get all products from mongodb
  // GET /api/products
  getAll: async (req, res) => {
    let products = await Model.find({});
    res.send(products);
  },

  // Get products w.r.t id from mongodb
  // GET /api/products/:id
  get: async (req, res) => {
    let product = await Model.findById(req.params.id);
    res.send(product);
  },

  // Create new Model in mongodb
  // POST /api/products/create
  create: async (req, res) => {
    let newModel = new Model({
      Name: req.body.Name,
      Description: req.body.Description,
      Sales: req.body.Sales,
      Stock: req.body.Stock,
      Category: req.body.Category,
      Tag: req.body.Tag,
      Check: req.body.Check,
      ImageP: req.body.ImageP,
      Thumb: req.body.Thumb,
      Date: req.body.Date,
    });
    // let product = await newModel.save();
    // res.send({ message: "Model created successfully!", data: product });
    res.send({ message: "Model created successfully!", data: req.body });
  },

  // Update Model w.r.t id from mongodb
  // PUT /api/products/update/:id
  update: async (req, res) => {
    // let product = await Model.findByIdAndUpdate(req.body.id, {
    //   $set: req.body,
    // });
    // res.send({ message: "Model updated successfully!", data: product });
    res.send({ message: "Model updated successfully!", data: req.body });
  },

  // Delete Model w.r.t id from mongodb
  // DELETE /api/products/delete/:id
  delete: async (req, res) => {
    //await Model.findByIdAndRemove(req.body.id);
    // await Model.deleteMany({ _id: [...req.body.ids] });
    res.send({ message: "Model updated successfully!", data: true });
  },

  //Seed with the initial data
  seed: async (req, res) => {
    try {
      //clear previous data from the database
      await Model.collection.drop();
    } catch (error) {}

    await Model.create(initialData, (error, data) => {
      if (error) {
        console.log("Something went wrong", error.name);
        res.send(
          "Something went wrong!!! Please, check server logs for the details"
        );
      } else {
        res.send(
          `Nicely saved ${data.length} types of model, at ${new Date(
            Date.now()
          )}`
        );
      }
    });
  },
};
