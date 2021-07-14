const mongoose = require("mongoose");
const { userSchemaObj } = require("../schemas/user");
const bcrypt = require("bcryptjs");
const { schemaOptions } = require("../helpers/helpers");

const userSchema = new mongoose.Schema(userSchemaObj, schemaOptions);

userSchema.pre("save", async function save(next) {
  if (!this.isModified("password")) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    return next();
  } catch (err) {
    return next(err);
  }
});

userSchema.methods.validatePassword = async function validatePassword(data) {
  return bcrypt.compare(data, this.password);
};

module.exports = mongoose.model("users", userSchema);
