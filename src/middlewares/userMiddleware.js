const { userSchema, validatePhoneNumberWithCountry } = require('../schemaValidations/userSchemaValidation');
const { findCountryCodeById } = require('../services/countryService');
const { errors, statusCodes, messages } = require('../utls/constants');
exports.validateSchema = async (req, res, next) => {
	try {
		await userSchema().validateAsync(req.body);
		const country = await findCountryCodeById(req.body.country);
		if (!country) return res.status(statusCodes.failed).json({ message: messages.countryNotExists });
		const { error: error1, phone_number } = validatePhoneNumberWithCountry(req.body.phoneNumber, country.code);
		if (error1) return res.status(400).json({ error1 });
		if (phone_number) {
			req.body.phoneNumber = phone_number;
			return next();
		}
		return res.status(500).json({ error: errors.somethingSeemsWrong });
	} catch (e) {
		if (JSON.stringify(e) === '{}') return res.send({ error: e.toString() });
		const { details } = e;
		return res.send({ error: details ? details[0].message : e.toString() });
	}
};
