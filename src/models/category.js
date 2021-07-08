const mongoose = require('mongoose');
const { categorySchemaObj } = require('../schemas/category');

const categorySchema = new mongoose.Schema(categorySchemaObj, { versionKey: false, timeStamps: true });

module.exports = mongoose.model('users', categorySchema);
