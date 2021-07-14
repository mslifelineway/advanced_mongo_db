const mongoose = require('mongoose');
const { schemaOptions } = require('../helpers/helpers');
const { brandSchemaObj } = require('../schemas/brand');

const brandSchema = new mongoose.Schema(brandSchemaObj, schemaOptions);

module.exports = mongoose.model('brands', brandSchema);
