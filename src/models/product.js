const mongoose = require('mongoose');
const { productSchemaObj } = require('../schemas/product');

const productSchema = new mongoose.Schema(productSchemaObj, { versionKey: false, timeStamps: true });

module.exports = mongoose.model('users', productSchema);
