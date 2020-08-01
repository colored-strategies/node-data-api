module.exports = function (app) {
  const urlPrefix = "/datatable";

  const ProductController = require("../product/product.controller");

  app.get(`${urlPrefix}/product`, ProductController.getAllForDatatable);

  // app.get('/api/users/:id', UserController.get);

  // app.post('/api/users', UserController.create);

  // app.put('/api/users/:id', UserController.update);

  // app.delete('/api/users/:id', UserController.delete);
};
