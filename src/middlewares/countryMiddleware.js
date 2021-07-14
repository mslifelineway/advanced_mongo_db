const {
  countrySchema,
} = require("../schemaValidations/countrySchemaValidation");
const { errors, statusCodes } = require("../utls/constants");
exports.validateSchema = async (req, res, next) => {
  try {
    await countrySchema().validateAsync(req.body);
    next();
  } catch (e) {
    if (JSON.stringify(e) === "{}") {
      return res.status(statusCodes.badRequest).json({ error: e.toString() });
    }
    const { details } = e;
    return res.status(statusCodes.badRequest).json({
      error: details ? details[0].message : errors.somethingSeemsWrong,
    });
  }
};
