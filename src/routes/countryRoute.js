const { saveCountry } = require("../controllers/countryController");
const { validateSchema } = require("../middlewares/countryMiddleware");

module.exports = (router) => {
  router.get("/country", (req, res) => {
    res.send({ message: "countries" });
  });
  router.post("/country/add", validateSchema, saveCountry);

  return router;
};
