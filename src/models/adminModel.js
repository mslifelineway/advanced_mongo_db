const mongoose = require("mongoose");
const { adminSchemaObj } = require("../schemas/admin");
const bcrypt = require("bcryptjs");
const { schemaOptions } = require("../helpers/helpers");
const _ = require("lodash");
const { statusCodes, roles } = require("../utls/constants");
const crypto = require("crypto");
const { saveAdminSessionToDatabase } = require("../helpers/jwt_helpers");
const jwt = require("jsonwebtoken");
const moment = require("moment");

const adminSchema = new mongoose.Schema(adminSchemaObj, schemaOptions);

adminSchema.pre("save", async function save(next) {
  if (!this.isModified("password")) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    return next();
  } catch (err) {
    return next(err);
  }
});

adminSchema.statics.findByCredentials = async function (email, password) {
  const admin = await this.findOne({ email });
  if (!admin) {
    return Promise.reject({ status: statusCodes.notFound });
  }
  const check = await bcrypt.compare(password, admin.password);
  if (check) {
    return admin;
  }
};

adminSchema.statics.hasRefreshTokenExpired = (expiresAt) => {
  let secondsSinceEpoch = Date.now() / 1000;
  const currentDate = moment(new Date());
  console.log('===> expiresAt, currentDate : ', moment(expiresAt), currentDate, moment(expiresAt) > currentDate)
  if (moment(expiresAt) > currentDate) {
    return false;
  } else {
    return true;
  }
};

adminSchema.methods.toJSON = function () {
  const admin = this;
  const adminObject = admin.toObject();
  return _.omit(adminObject, ["password"]);
};

adminSchema.methods.validatePassword = async function validatePassword(data) {
  return bcrypt.compare(data, this.password);
};

adminSchema.methods.generateRefreshAuthToken = async function () {
  try {
    const buf = await crypto.randomBytes(64);
    return { refreshToken: buf.toString("hex") };
  } catch (refreshAuthTokenError) {
    return { refreshAuthTokenError };
  }
};

adminSchema.methods.createSession = async function () {
  const { refreshToken, refreshAuthTokenError } =
    await this.generateRefreshAuthToken();
  if (refreshAuthTokenError) {
    return { refreshAuthTokenError };
  }
  const { saveSessionError } = await saveAdminSessionToDatabase(
    this,
    refreshToken
  );
  if (saveSessionError) {
    return { saveSessionError };
  }

  return { refreshToken };
};

adminSchema.methods.generateAccessAuthToken = async function () {
  try {
    const accessToken = await jwt.sign(
      { _id: this._id.toHexString(), role: roles.admin },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "1h" }
    );
    return { accessToken };
  } catch (accessAuthTokenError) {
    return { accessAuthTokenError };
  }
};

module.exports = mongoose.model("admins", adminSchema);
