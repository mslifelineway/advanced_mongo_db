const mongoose = require('mongoose');
const { schemaOptions } = require('../helpers/helpers');
const { countrySchemaObj } = require('../schemas/country');

const countrySchema = new mongoose.Schema(countrySchemaObj, schemaOptions);

module.exports = mongoose.model('countries', countrySchema);
