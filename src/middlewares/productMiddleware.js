const {
  addProductSchema,
} = require("../schemaValidations/productSchemaValidation");
const { errors, statusCodes } = require("../utls/constants");

exports.validateSchema = async (req, res, next) => {
  try {
    await addProductSchema().validateAsync(req.body);
    return next();
  } catch (e) {
    if (e.details) {
      const details = e.details[0];
      e.status = statusCodes.unproccessible;
      if (details.type === "any.required") e.status = statusCodes.badRequest;
      e.message = details.message;
    }
    return next(e);
  }
};
