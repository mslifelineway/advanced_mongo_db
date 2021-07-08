const { countrySchema } = require('../schemaValidations/countrySchemaValidation');
const { errors } = require('../utls/constants');
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
