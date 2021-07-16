const Joi = require("joi");
const { errors } = require("../utls/constants");
const joiPhoneNumber = Joi.extend(require("joi-phone-number"));
Joi.objectId = require("joi-objectid")(Joi);
exports.userSchema = () => {
  const labels = {
    name: "Name",
    email: "Email",
    password: "Password",
    confirmPassword: "Confirm Password",
    phoneNumber: "Phone Number",
    country: "Country",
    dob: "Date of birth",
  };
  const schema = Joi.object({
    name: Joi.string()
      .trim()
      // .alphanum()
      .min(3)
      .max(50)
      .required()
      .messages({
        "string.base": `${labels.name} should be a type of 'text'.`,
        // 'string.alphanum': `${labels.name} must be alpha numeric only.`,
        "string.empty": `${labels.name} should not be empty.`,
        "string.min": `${labels.name} must contain min {#limit} chars.`,
        "string.max": `${labels.name} should not have more than {#limit} chars.`,
        "any.required": `Please provide your ${labels.name}.`,
      }),
    email: Joi.string()
      .trim()
      .empty()
      .min(6)
      .max(50)
      .email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net", "in", "org"] },
      })
      .required()
      .messages({
        "string.base": `${labels.email} should be a type of 'text'.`,
        "string.empty": `${labels.email} should not be empty.`,
        "string.min": `${labels.email} should have a minimum length of {#limit}.`,
        "string.email": `Only .com, .net, .in or .org allowed.`,
        "any.required": `Please provide your ${labels.email}.`,
      }),
    password: Joi.string()
      .trim()
      .empty()
      .min(8)
      .max(15)
      .pattern(
        new RegExp(
          /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&])([a-zA-Z0-9@$!%*?&]{8,15})$/
        )
      )
      .required()
      .messages({
        "string.base": `${labels.password} should be a type of 'text'.`,
        "string.empty": `${labels.password} should not be empty.`,
        "string.min": `${labels.password} must contain at least {#limit} character.`,
        "string.max": `${labels.password} should not contain more than  {#limit} character.`,
        "string.pattern.base": `${labels.password} must contain one uppercase character, one lowercase character, one digit and one special character.`,
        "any.required": `Please provide the ${labels.password}.`,
      }),
    confirmPassword: Joi.any()
      .equal(Joi.ref("password"))
      .required()
      .options({
        messages: {
          "any.only": `${labels.confirmPassword} password does not match`,
          "any.required": `${labels.confirmPassword} is required!`,
        },
      }),
    phoneNumber: Joi.string()
      .trim()
      .empty()
      .required()
      .messages({
        "string.base": `${labels.phoneNumber} should be a type of 'text'.`,
        "string.empty": `${labels.phoneNumber} should not be empty.`,
        "any.required": `Please provide the ${labels.phoneNumber}.`,
      }),
    country: Joi.objectId()
      .empty()
      .required()
      .messages({
        "string.base": `${labels.country} should be a type of 'objectId'.`,
        "string.empty": `${labels.country} should not be empty.`,
        "string.pattern.name": `Please provide a valid ${labels.country}.`,
        "any.required": `Please provide the ${labels.country}.`,
      }),
    dob: Joi.date()
      .max(new Date(Date.now() - 1000 * 60 * 60 * 24 * 365 * 18))
      .required()
      .messages({
        "date.base": `Please provide the valid ${labels.dob}.`,
        "date.max": `Minimum age must be 18 years'.`,
        "any.required": `${labels.dob} is required`,
      }),
  });
  return schema;
};

exports.validatePhoneNumberWithCountry = (
  phoneNumber,
  country,
  format = "international"
) => {
  const { error, value } = joiPhoneNumber
    .string()
    .phoneNumber({
      defaultCountry: `${country}`,
      format: `${format}`,
      strict: true,
    })
    .validate(`${phoneNumber}`);

  return {
    error: error ? errors.invalidPhoneNumber : undefined,
    phone_number: value,
  };
};

exports.updateUserSchema = () => {
  const labels = {
    id: "User Id",
    name: "Name",
    phoneNumber: "Phone Number",
    country: "Country",
    dob: "Date of birth",
  };
  const schema = Joi.object({
    id: Joi.objectId()
      .empty()
      .required()
      .messages({
        "string.base": `${labels.id} should be a type of 'objectId'.`,
        "string.empty": `${labels.id} should not be empty.`,
        "string.pattern.name": `Please provide the valid ${labels.id}.`,
        "any.required": `${labels.id} is required.`,
      }),
    name: Joi.string()
      .trim()
      .min(3)
      .max(50)
      .messages({
        "string.base": `${labels.name} should be a type of 'text'.`,
        "string.empty": `${labels.name} should not be empty.`,
        "string.min": `${labels.name} must contain min {#limit} chars.`,
        "string.max": `${labels.name} should not have more than {#limit} chars.`,
      }),

    phoneNumber: Joi.string()
      .trim()
      .empty()
      .messages({
        "string.base": `${labels.phoneNumber} should be a type of 'text'.`,
        "string.empty": `${labels.phoneNumber} should not be empty.`,
      }),
    country: Joi.objectId()
      .empty()
      .messages({
        "string.base": `${labels.country} should be a type of 'objectId'.`,
        "string.empty": `${labels.country} should not be empty.`,
        "string.pattern.name": `Please provide a valid ${labels.country}.`,
      }),
    dob: Joi.date()
      .max(new Date(Date.now() - 1000 * 60 * 60 * 24 * 365 * 18))
      .messages({
        "date.base": `Please provide the valid ${labels.dob}.`,
        "date.max": `Minimum age must be 18 years'.`,
      }),
  });
  return schema;
};

exports.userLoginSchema = () => {
  const labels = {
    email: "Email",
    password: "Password",
  };
  return Joi.object({
    email: Joi.string()
      .trim()
      .empty()
      .min(6)
      .max(50)
      .email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net", "in", "org"] },
      })
      .required()
      .messages({
        "string.base": `${labels.email} should be a type of 'text'.`,
        "string.empty": `${labels.email} should not be empty.`,
        "string.min": `${labels.email} should have a minimum length of {#limit}.`,
        "string.email": `Only .com, .net, .in or .org allowed.`,
        "any.required": `${labels.email} is required!.`,
      }),
    password: Joi.string()
      .trim()
      .empty()
      .min(8)
      .max(15)
      .pattern(
        new RegExp(
          /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&])([a-zA-Z0-9@$!%*?&]{8,15})$/
        )
      )
      .required()
      .messages({
        "string.base": `${labels.password} should be a type of 'text'.`,
        "string.empty": `${labels.password} should not be empty.`,
        "string.min": `${labels.password} must contain at least {#limit} character.`,
        "string.max": `${labels.password} should not contain more than  {#limit} character.`,
        "string.pattern.base": `${labels.password} must contain one uppercase character, one lowercase character, one digit and one special character.`,
        "any.required": `${labels.password} is required.`,
      }),
  });
};
