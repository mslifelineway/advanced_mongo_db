const mongoose = require('mongoose');
const { countrySchemaObj } = require('../schemas/country');

const countrySchema = new mongoose.Schema(countrySchemaObj, { versionKey: false, timeStamps: true });

module.exports = mongoose.model('countries', countrySchema);
