module.exports = function (app) {
  const urlPrefix = "/products";

  const ProductController = require("../product/product.controller");

  app.get(`${urlPrefix}`, ProductController.getAllForDatatable);
  app.post(`${urlPrefix}/add`, ProductController.create);
  app.put(`${urlPrefix}/update`, ProductController.update);
  app.delete(`${urlPrefix}/delete`, ProductController.delete);
};
