const { addProduct } = require("../controllers/productController");
const { authenticate } = require("../middlewares/adminMiddleware");
const { validateSchema } = require("../middlewares/productMiddleware");

module.exports = (router) => {
  router.post("/product/add", authenticate, validateSchema, addProduct);
  return router;
};
