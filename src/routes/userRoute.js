const { saveUser, updateUser } = require("../controllers/userController");
const {
  validateSchema,
  validateUpdateSchema,
  checkReqiuredDataToUpdate,
} = require("../middlewares/userMiddleware");

module.exports = (router) => {
  router.post("/user/register", validateSchema, saveUser);
  router.patch(
    "/user/:id/update",
    checkReqiuredDataToUpdate,
    validateUpdateSchema,
    updateUser
  );
  return router;
};
