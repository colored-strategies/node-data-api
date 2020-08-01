module.exports = function (app) {
  const urlPrefix = "/products";

  const ProductController = require("../product/product.controller");

  //Return all the products
  app.get(`${urlPrefix}`, ProductController.getAllForDatatable);
  //Create new product
  app.post(`${urlPrefix}/add`, ProductController.create);
  //Update given product's data
  app.put(`${urlPrefix}/update`, ProductController.update);
  //Delete the product/s with given id/s
  app.delete(`${urlPrefix}/delete`, ProductController.delete);
};
