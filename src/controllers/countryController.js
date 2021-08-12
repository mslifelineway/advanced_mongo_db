const { _slugify, _copy } = require("../helpers/helpers");
const { CountryModel } = require("../models");
const { statusCodes, errors, messages } = require("../utls/constants");

exports.saveCountry = async (req, res, next) => {
  try {
    const country = req.body;
    country.slug = _slugify(country.name);
    const savedCountry = await new CountryModel(country).save();
    if (savedCountry)
      return res
        .status(statusCodes.created)
        .json({ message: messages.countrySaved, user: _copy(savedCountry) });
    return next({
      message: messages.countryNotSaved,
    });
  } catch (e) {
    if (e && e.code === 11000) {
      if (e.keyPattern && e.keyPattern.slug) {
        messages.countryAlreadyExists;
        return next({
          message: messages.countryAlreadyExists,
          status: statusCodes.success,
        });
      }
      return next({
        message: messages.countryAlreadyExists,
        status: statusCodes.countryExistsByCode,
      });
    }
    e.message = errors.somethingSeemsWrong;
    return next(e);
  }
};

exports.getCountries = async (req, res, next) => {
  try {
    return res.status(statusCodes.success).json({
      message: messages.countriesFetched,
      countries: _copy(await CountryModel.find({})),
    });
  } catch (e) {
    e.message = errors.somethingSeemsWrong;
    return next(e);
  }
};
exports.getCountryById = async (req, res, next) => {
  try {
    return res.status(statusCodes.success).json({
      message: messages.countryFetched,
      country: _copy(await CountryModel.find({ _id: req.params.id })),
    });
  } catch (e) {
    const { path } = e;
    if (path) {
      e.message = messages.invalidCountryId;
    }
    next(e);
  }
};
exports.getCountryBySlug = async (req, res, next) => {
  try {
    return res.status(statusCodes.success).json({
      message: messages.countryFetched,
      country: _copy(await CountryModel.find({ slug: req.params.slug })),
    });
  } catch (e) {
    return res.status(statusCodes.badRequest).json({
      error:
        e.toString() && e.toString() !== ""
          ? e.toString()
          : errors.somethingSeemsWrong,
    });
  }
};
exports.getCountryByCode = async (req, res, next) => {
  try {
    return res.status(statusCodes.success).json({
      message: messages.countryFetched,
      country: _copy(await CountryModel.find({ code: req.params.code })),
    });
  } catch (e) {
    return res.status(statusCodes.badRequest).json({
      error:
        e.toString() && e.toString() !== ""
          ? e.toString()
          : errors.somethingSeemsWrong,
    });
  }
};

exports.updateCountryStatusById = async (req, res, next) => {
  try {
    const updatedCountry = await CountryModel.findOneAndUpdate(
      {
        _id: req.params.id,
      },
      { is_active: req.body.is_active }
    );
    if (updatedCountry) {
      return res.status(statusCodes.success).json({
        message: messages.adminUpdated,
        country: _copy(updatedCountry),
      });
    }
    return res
      .status(statusCodes.badRequest)
      .json({ error: messages.countryNotExists });
  } catch (e) {
    return res.status(statusCodes.badRequest).json({
      error:
        e.toString() && e.toString() !== ""
          ? e.toString()
          : errors.somethingSeemsWrong,
    });
  }
};

exports.updateCountryById = async (req, res, next) => {
  try {
    const country = req.body;
    country.slug = _slugify(country.name);
    const existingCountry = await CountryModel.findOne({
      slug: country.slug,
      $ne: { _id: req.params.id },
    });
    if (existingCountry)
      return res
        .status(statusCodes.badRequest)
        .json({ error: messages.countryAlreadyExists });
    const updatedCountry = await CountryModel.findOneAndUpdate(
      {
        _id: req.params.id,
      },
      req.body
    );
    if (updatedCountry) {
      return res.status(statusCodes.success).json({
        message: messages.adminUpdated,
        country: _copy(updatedCountry),
      });
    }
    return res
      .status(statusCodes.badRequest)
      .json({ error: messages.countryNotUpdated });
  } catch (e) {
    return res.status(statusCodes.badRequest).json({
      error:
        e.toString() && e.toString() !== ""
          ? e.toString()
          : errors.somethingSeemsWrong,
    });
  }
};
