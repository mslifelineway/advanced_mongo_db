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
    if (e.details) {
      const details = e.details[0];
      e.status = statusCodes.unproccessible;
      if (details.type === "any.required") e.status = statusCodes.badRequest;
      e.message = details.message;
    }
    next(e);
  }
};

exports.validateCountryStatusUpdateSchema = (req, res, next) => {
  const { is_active } = req.body;
  if (typeof is_active === "boolean") {
    return next();
  }
  if (is_active) {
    return next({ message: messages.invalidCountryStatus });
  }
  return next({
    message: messages.countryStatusRequired,
    status: statusCodes.badReuest,
  });
};
exports.validateCountryUpdateSchema = async (req, res, next) => {
  try {
    if (Object.keys(req.body).length === 0) {
      return res.status(statusCodes.success).json({
        message: messages.nothingUpdated,
      });
    }
    await updateCountrySchema().validateAsync(req.body);
    next();
  } catch (e) {
    if (e.details) {
      const details = e.details[0];
      e.status = statusCodes.unproccessible;
      if (details.type === "any.required") e.status = statusCodes.badRequest;
      e.message = details.message;
    }
    next(e);
  }
};

exports.validateCountryCode = (req, res, next) => {
  const { code } = req.params;

  if (!code) {
    if (typeof code === "undefined")
    return next({
      message: messages.countryCodeRequired,
      status: statusCodes.badRequest,
    });
    return next({
      message: messages.countryCodeEmpty,
      status: statusCodes.unproccessible,
    });
  }
  return next();
};

exports.validateCountrySlug = (req, res, next) => {
  const { slug } = req.params;
  if (!slug) {
    if (typeof slug === "undefined")
      return next({
        message: messages.countrySlugRequired,
        status: statusCodes.badRequest,
      });
    return next({
      message: messages.countrySlugEmpty,
      status: statusCodes.unproccessible,
    });
  }
  return next();
};
