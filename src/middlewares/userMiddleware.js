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
    if (!country)
      return res
        .status(statusCodes.badRequest)
        .json({ message: messages.countryNotExists });
    const { error: error1, phone_number } = validatePhoneNumberWithCountry(
      req.body.phoneNumber,
      country.code
    );
    if (error1) return res.status(statusCodes.badRequest).json({ error1 });
    if (phone_number) {
      req.body.phoneNumber = phone_number;
      return next();
    }
    return res
      .status(statusCodes.badRequest)
      .json({ error: errors.somethingSeemsWrong });
  } catch (e) {
    if (JSON.stringify(e) === "{}")
      return res.status(statusCodes.badRequest).json({ error: e.toString() });
    const { details } = e;
    return res
      .status(statusCodes.badRequest)
      .json({ error: details ? details[0].message : e.toString() });
  }
};

exports.checkReqiuredDataToUpdate = async (req, res, next) => {
  if (Object.keys(req.body).length === 0) {
    return res.status(statusCodes.noContent).json({
      message: messages.nothingUpdated,
    });
  }
  const { phoneNumber, country } = req.body;
  if (country && !phoneNumber) {
    return res.status(statusCodes.badRequest).json({
      error: messages.phoneNumberNeedToBeUpdated,
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
          return res
            .status(statusCodes.badRequest)
            .json({ error: messages.userNotExists });
        }
        country = user.country;
      }

      if (!country)
        return res
          .status(statusCodes.badRequest)
          .json({ error: messages.countryNotExists });
      const { error: error1, phone_number } = validatePhoneNumberWithCountry(
        req.body.phoneNumber,
        country.code
      );
      if (error1) return res.status(statusCodes.badRequest).json({ error1 });
      if (phone_number) {
        req.body.phoneNumber = phone_number;
      }
    }
    return next();
  } catch (e) {
    if (JSON.stringify(e) === "{}")
      return res.status(statusCodes.badRequest).json({ error: e.toString() });
    const { details } = e;
    return res
      .status(statusCodes.badRequest)
      .json({ error: details ? details[0].message : e.toString() });
  }
};
