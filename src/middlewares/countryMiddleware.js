const {
  countrySchema,
  updateCountrySchema,
} = require("../schemaValidations/countrySchemaValidation");
const { errors, statusCodes, messages } = require("../utls/constants");

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

exports.validateCountryStatusUpdateSchema = (req, res, next) => {
  const { is_active } = req.body;
  if (typeof is_active === "boolean" || [0, 1].includes(is_active)) {
    return next();
  }
  if (status) {
    return res
      .status(statusCodes.badRequest)
      .json({ error: messages.invalidCountryStatus });
  }

  return res
    .status(statusCodes.badRequest)
    .json({ error: messages.countryStatusRequired });
};
exports.validateCountryUpdateSchema = async (req, res, next) => {
  try {
    if (Object.keys(req.body).length === 0) {
      return res
        .status(statusCodes.noContent)
        .json({ message: messages.nothingUpdated });
    }
    await updateCountrySchema().validateAsync(req.body);
    next();
  } catch (e) {
    if (Object.keys(e).length === 0) {
      return res.status(statusCodes.badRequest).json({ error: e.toString() });
    }
    const { details } = e;
    return res.status(statusCodes.badRequest).json({
      error: details ? details[0].message : errors.somethingSeemsWrong,
    });
  }
};
