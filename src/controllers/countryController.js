const { _slugify, _copy } = require("../helpers/helpers");
const { CountryModel } = require("../models");
const { statusCodes, errors, messages } = require("../utls/constants");

exports.saveCountry = async (req, res) => {
  try {
    const country = req.body;
    country.slug = _slugify(country.name);
    const savedCountry = await new CountryModel(country).save();
    if (savedCountry)
      return res
        .status(statusCodes.created)
        .json({ message: messages.countrySaved, user: _copy(savedCountry) });
    return res
      .status(statusCodes.badRequest)
      .json({ error: messages.countryNotSaved });
  } catch (e) {
    if (e && e.code === 11000) {
      if (e.keyPattern && e.keyPattern.slug)
        return res
          .status(statusCodes.success)
          .json({ message: messages.countryAlreadyExists });
      return res
        .status(statusCodes.success)
        .json({ message: messages.countryExistsByCode });
    }

    return res
      .status(statusCodes.badRequest)
      .json({ error: e.toString(), message: errors.somethingSeemsWrong });
  }
};
