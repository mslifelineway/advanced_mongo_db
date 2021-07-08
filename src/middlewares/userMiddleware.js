const { userSchema, validatePhoneNumberWithCountry } = require('../schemaValidations/userSchemaValidation');
const { errors } = require('../utls/constants');
exports.validateSchema = async (req, res, next) => {
	try {
		await userSchema().validateAsync(req.body);
		//TODO: FIND THE COUNTRY CODE BY PROVIDED COUNTRY AND THEN VAILDATE PHONE NUMBER, FIND COUNTRY METHOD WILL BE WRITTEN IN COUNTRY SERVICES
		const countryCode = 'IN';
		const { error: error1, phone_number } = validatePhoneNumberWithCountry(req.body.phoneNumber, countryCode);
		if (error1) {
			return res.status(400).json({ error1 });
		}
		if (phone_number) {
			next();
		}
		return res.status(500).json({ error: errors.somethingSeemsWrong });
	} catch (e) {
		if (JSON.stringify(e) === '{}') {
			return res.send({ error: e.toString() });
		}
		const { details } = e;

		return res.send({ error: details ? details[0].message : '' });
	}
};
