const mongoose = require("mongoose");
const { adminSchemaObj } = require("../schemas/admin");
const bcrypt = require("bcryptjs");
const { schemaOptions } = require("../helpers/helpers");

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

adminSchema.methods.validatePassword = async function validatePassword(data) {
  return bcrypt.compare(data, this.password);
};

module.exports = mongoose.model("admins", adminSchema);
