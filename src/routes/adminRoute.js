const { saveAdmin, updateAdmin, getAdminById } = require("../controllers/adminController");
const {
  validateSchema,
  validateUpdateSchema,
  checkReqiuredDataToUpdate,
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
  return router;
};
