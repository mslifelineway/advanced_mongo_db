const {
  saveUser,
  updateUser,
  getAllUsers,
  getUserById,
  login
} = require("../controllers/userController");
const {
  validateSchema,
  validateUpdateSchema,
  checkReqiuredDataToUpdate,
  loginValidation,
} = require("../middlewares/userMiddleware");

module.exports = (router) => {
  router.post("/user/register", validateSchema, saveUser);
  router.patch(
    "/user/:id/update",
    checkReqiuredDataToUpdate,
    validateUpdateSchema,
    updateUser
  );
  router.get("/users", getAllUsers);
  router.get("/user/:id", getUserById);
  router.post("/login", loginValidation, login)
  return router;
};
