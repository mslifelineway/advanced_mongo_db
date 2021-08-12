const {
  validatePhoneNumberWithCountry,
} = require("../schemaValidations/userSchemaValidation");
const { findCountryCodeById } = require("../services/countryService");
const { findCountryByAdminId } = require("../services/adminService");
const { errors, statusCodes, messages } = require("../utls/constants");
const {
  adminSchema,
  updateAdminSchema,
  adminLoginSchema,
} = require("../schemaValidations/adminSchemaValidation");
const jwt = require("jsonwebtoken");
const adminModel = require("../models/adminModel");
const { AdminModel } = require("../models");
const moment = require("moment");

exports.validateSchema = async (req, res, next) => {
  try {
    await adminSchema().validateAsync(req.body);
    const country = await findCountryCodeById(req.body.country);
    if (!country)
      return next({
        message: messages.countryNotExists,
        status: statusCodes.notFound,
      });
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
    await updateAdminSchema().validateAsync(req.body);

    if (req.body.phoneNumber) {
      let country;
      if (req.body.country) {
        country = await findCountryCodeById(req.body.country);
      } else {
        const admin = await findCountryByAdminId(req.body.id);
        if (!admin) {
          return next({
            message: messages.adminNotExists,
            status: statusCodes.notFound,
          });
        }
        country = admin.country;
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

exports.loginValidation = async (req, res, next) => {
  try {
    await adminLoginSchema().validateAsync(req.body);
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

exports.authenticate = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res
      .status(401)
      .json({ message: messages.authorizationTokenRequired });
  }
  const token = authorization.split(" ")[1];
  if (!token)
    return res
      .status(401)
      .json({ message: messages.authorizationTokenRequired });
  try {
    const admin = jwt.verify(token, process.env.JWT_SECRET_KEY);
    console.log("====> admin: ", admin);
    if (!admin) {
    }
    const currentDate = moment(new Date());
    const { _id, role, iat, exp } = admin;
    const hasTokenExpired = AdminModel.hasRefreshTokenExpired(exp);
    console.log("-----> hasTokenExpired", hasTokenExpired);
    //TODO: CHECK FOR ROLE
    req.admin = admin;
    return next();
  } catch (e) {
    return res
      .status(401)
      .json({ message: messages.invalidAuthorizationToken });
  }
};
