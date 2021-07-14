const mongoose = require('mongoose');
const { schemaOptions } = require('../helpers/helpers');
const { categorySchemaObj } = require('../schemas/category');

const categorySchema = new mongoose.Schema(categorySchemaObj, schemaOptions);

module.exports = mongoose.model('categories', categorySchema);
