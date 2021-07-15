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
  validateCountryCode,
  validateCountrySlug,
} = require("../middlewares/countryMiddleware");

module.exports = (router) => {
  router.post("/country/add", validateSchema, saveCountry);
  router.get("/countries", getCountries);
  router.get("/country/:id", getCountryById);
  router.get("/countryBySlug/:slug", validateCountrySlug, getCountryBySlug);
  router.get("/countryByCode/:code", validateCountryCode, getCountryByCode);
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
