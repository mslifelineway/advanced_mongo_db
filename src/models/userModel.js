const mongoose = require('mongoose');
const { userSchemaObj } = require('../schemas/user');

const userSchema = new mongoose.Schema(userSchemaObj, { versionKey: false, timeStamps: true });

module.exports = mongoose.model('users', userSchema);
