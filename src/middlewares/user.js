const { newUserSchema } = require('../schemaValidations/userValidation');
exports.validateNewRegister = async (req, res, next) => {
	try {
		const { error, value } = await newUserSchema().validateAsync(req.body);
		console.log('error : ', JSON.stringify(error));
		console.log('v : ', JSON.stringify(value));
		return res.send({ error: error, value: value });
	} catch (e) {
		console.log('===> Error : ', JSON.stringify(e));
		const { details } = e;

		return res.send({ error: details[0].message });
	}
};
