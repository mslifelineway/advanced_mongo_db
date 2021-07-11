const { _copy } = require("../helpers/helpers");
const { CountryModel } = require("../models");

exports.findCountryCodeById = async (_id) => {
  const country = await CountryModel.findOne(
    { _id },
    { code: 1, _id: 1, is_active: 1 }
  );
  return _copy(country);
};
