const {
  userSchema,
  validatePhoneNumberWithCountry,
  updateUserSchema,
} = require("../schemaValidations/userSchemaValidation");
const { findCountryCodeById } = require("../services/countryService");
const { findCountryByUserId } = require("../services/userService");
const { errors, statusCodes, messages } = require("../utls/constants");

exports.validateSchema = async (req, res, next) => {
  try {
    await userSchema().validateAsync(req.body);
    const country = await findCountryCodeById(req.body.country);
    if (!country) {
      return next({
        message: messages.countryNotExists,
        status: statusCodes.notFound,
      });
    }
    const { error: error1, phone_number } = validatePhoneNumberWithCountry(
      req.body.phoneNumber,
      country.code
    );
    if (phone_number) {
      req.body.phoneNumber = phone_number;
      return next();
    }
    return next({ message: error1 ? error1 : errors.somethingSeemsWrong });
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

exports.checkReqiuredDataToUpdate = async (req, res, next) => {
  if (Object.keys(req.body).length === 0) {
    return res.status(statusCodes.success).json({
      message: messages.nothingUpdated,
    });
  }
  const { phoneNumber, country } = req.body;
  if (country && !phoneNumber) {
    return next({
      message: messages.phoneNumberNeedToBeUpdated,
      status: statusCodes.badRequest,
    });
  }
  next();
};
exports.validateUpdateSchema = async (req, res, next) => {
  try {
    req.body.id = req.params.id;
    await updateUserSchema().validateAsync(req.body);

    if (req.body.phoneNumber) {
      let country;
      if (req.body.country) {
        country = await findCountryCodeById(req.body.country);
      } else {
        const user = await findCountryByUserId(req.body.id);
        if (!user) {
          return next({
            message: messages.userNotExists,
            status: statusCodes.notFound,
          });
        }
        country = user.country;
      }

      if (!country)
        return next({
          message: messages.countryNotExists,
          status: statusCodes.notFound,
        });

      const { error: error1, phone_number } = validatePhoneNumberWithCountry(
        req.body.phoneNumber,
        country.code
      );
      if (error1) return next({ message: error1 });
      if (phone_number) {
        req.body.phoneNumber = phone_number;
      }
    }
    return next();
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
exports.loginValidation = (req, res, next) => {
  const { email, password } = req.body;
  if (email && password) {
    return next();
  }
  if (!email) {
    return next({
      message: messages.emailMissing,
      status: statusCodes.badRequest,
    });
  }
  if (!password) {
    return next({
      message: messages.emailMissing,
      status: statusCodes.badRequest,
    });
  }
  return next({ message: errors.somethingSeemsWrong });
};
