const mongoose = require('mongoose');
const { brandSchemaObj } = require('../schemas/brand');

const brandSchema = new mongoose.Schema(brandSchemaObj, { versionKey: false, timeStamps: true });

module.exports = mongoose.model('brands', brandSchema);
