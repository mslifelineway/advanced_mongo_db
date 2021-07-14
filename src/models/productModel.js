const mongoose = require('mongoose');
const { schemaOptions } = require('../helpers/helpers');
const { productSchemaObj } = require('../schemas/product');

const productSchema = new mongoose.Schema(productSchemaObj, schemaOptions);

module.exports = mongoose.model('products', productSchema);
