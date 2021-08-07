const { addProduct } = require("../controllers/productController");
const { validateSchema } = require("../middlewares/productMiddleware");

module.exports = (router) => {
  router.post("/products/add", validateSchema, addProduct);
  return router;
};
