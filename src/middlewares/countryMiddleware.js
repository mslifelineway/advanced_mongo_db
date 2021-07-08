const { _slugify } = require('../helpers/helpers');
const { CountryModel } = require('../models');
const { countrySchema } = require('../schemaValidations/countrySchemaValidation');
const { errors, messages } = require('../utls/constants');
exports.validateSchema = async (req, res, next) => {
	try {
		await countrySchema().validateAsync(req.body);
		next();
	} catch (e) {
		if (JSON.stringify(e) === '{}') {
			return res.send({ error: e.toString() });
		}
		const { details } = e;
		return res.send({ error: details ? details[0].message : '' });
	}
};

exports.isCountryAlreadyExists = async (req, res, next) => {
	const { name, code } = req.body;
	const slug = _slugify(name);
	try {
		const existingCountry = await CountryModel.findOne({ $or: [{ slug }, { code }] });
		if (existingCountry) {
			if (existingCountry.slug === slug) {
				return res.status(200).json({ message: messages.countryAlreadyExists });
			}
			return res.status(200).json({ message: messages.countryExistsByCode });
		}
		next();
	} catch (e) {
		return res.status(400).json({ error: e.toString(), message: errors.somethingSeemsWrong });
	}
};
