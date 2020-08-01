
const Model = require("./product.model");


module.exports = {

    getAllForDatatable: async (req, res) => {
        Model.dataTables({
            limit: req.query.length,
            skip: req.query.start,
            order: req.query.order,
            columns: req.query.columns,
            search: {
                ...req.query.search,
                fields: ["Name", "Description", "Category", "Tag"],
            },
        }).then(function (table) {
            res.json({
                draw: req.query.draw,
                data: table.data,
                recordsFiltered: table.total,
                recordsTotal: table.total,
            });
        }).catch((error) => {
            console.log("error.... ", error);
        });
    },

    // Get all products from mongodb
    // GET /api/products
    getAll: async (req, res) => {
        let products = await Model.find({})
        res.send(products)
    },


    // Get products w.r.t id from mongodb
    // GET /api/products/:id
    get: async (req, res) => {
        let product = await Model.findById(req.params.id)
        res.send(product);
    },


    // Create new Model in mongodb
    // POST /api/products/create
    create: async (req, res) => {
        let newModel = new Model(
            {
                name: req.body.name,
                email: req.body.email,
                gender: req.body.gender,
                active: true
            }
        );

        let product = await newModel.save()
        res.send({ message: 'Model created successfully!', data: product });
    },


    // Update Model w.r.t id from mongodb
    // PUT /api/products/update/:id
    update: async (req, res) => {
        let product = await Model.findByIdAndUpdate(req.params.id, { $set: req.body })
        res.send({ message: 'Model updated successfully!', data: product });
    },


    // Delete Model w.r.t id from mongodb
    // DELETE /api/products/delete/:id
    delete: async (req, res) => {
        await Model.findByIdAndRemove(req.params.id)
        res.send('Model deleted successfully!');
    },

};