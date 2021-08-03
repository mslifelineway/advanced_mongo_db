const {
  saveAdmin,
  updateAdmin,
  getAdminById,
  login,
} = require("../controllers/adminController");
const {
  validateSchema,
  validateUpdateSchema,
  checkReqiuredDataToUpdate,
  loginValidation,
} = require("../middlewares/adminMiddleware");

module.exports = (router) => {
  router.post("/admin/register", validateSchema, saveAdmin);
  router.patch(
    "/admin/:id/update",
    checkReqiuredDataToUpdate,
    validateUpdateSchema,
    updateAdmin
  );
  router.get("/admin/:id", getAdminById);
  router.post("/login", loginValidation, login);
  return router;
};
