const { CountryModel } = require('../models');
const { statusCodes, messages, _copy } = require('../utls/constants');

exports.findCountryByName = async (name) => {
	try {
		const savedCountry = await CountryModel.find({ name });
		if (savedCountry)
			return {
				status: statusCodes.created,
				message: messages.countrySaved,
				country: _copy(savedCountry),
			};
		return {
			status: statusCodes.failed,
			message: messages.countryNotSaved,
		};
	} catch (e) {
		return {
			status: statusCodes.failed,
			message: e.toString(),
			e,
		};
	}
};

exports.insert = async (country) => {
	try {
		const savedCountry = await new CountryModel(country).save();
		if (savedCountry)
			return {
				status: statusCodes.created,
				message: messages.countrySaved,
				country: _copy(savedCountry),
			};
		return {
			status: statusCodes.failed,
			message: messages.countryNotSaved,
		};
	} catch (e) {
		return {
			status: statusCodes.failed,
			message: e.toString(),
			e,
		};
	}
};
