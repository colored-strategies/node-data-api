module.exports = function (app) {
  const urlPrefix = "/products";

  const ProductController = require("../product/product.controller");

  app.get(`${urlPrefix}`, ProductController.getAllForDatatable);
  app.post(`${urlPrefix}`, ProductController.getAllForDatatable);
  app.put(`${urlPrefix}/:id`, ProductController.getAllForDatatable);
  app.delete(`${urlPrefix}/:id`, ProductController.getAllForDatatable);

  // app.get('/api/users/:id', UserController.get);

  // app.post('/api/users', UserController.create);

  // app.put('/api/users/:id', UserController.update);

  // app.delete('/api/users/:id', UserController.delete);
};
