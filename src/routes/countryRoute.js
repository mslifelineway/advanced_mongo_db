const {
  saveCountry,
  getCountries,
  getCountryById,
  getCountryBySlug,
  getCountryByCode,
  updateCountryStatusById,
  updateCountryById,
} = require("../controllers/countryController");

const {
  validateSchema,
  validateCountryUpdateSchema,
  validateCountryStatusUpdateSchema,
} = require("../middlewares/countryMiddleware");

module.exports = (router) => {
  router.get("/country", (req, res) => {
    res.send({ message: "countries" });
  });
  router.post("/country/add", validateSchema, saveCountry);
  router.get("/countries", getCountries);
  router.get("/country/slug/:slug", getCountryBySlug);
  router.get("/country/code/:code", getCountryByCode);
  router.get("/country/:id", getCountryById);
  router.patch(
    "/country/:id/update",
    validateCountryStatusUpdateSchema,
    updateCountryStatusById
  );
  router.put(
    "/country/:id/update",
    validateCountryUpdateSchema,
    updateCountryById
  );

  return router;
};
