const Joi = require('joi');
exports.countrySchema = () => {
	const labels = { name: 'Country Name', code: 'Country Code', flag: 'Country Flag' };
	const schema = Joi.object({
		name: Joi.string()
			.trim()
			.min(3)
			.max(50)
			.required()
			.messages({
				'string.base': `${labels.name} should be a type of 'text'.`,
				'string.empty': `${labels.name} should not empty.`,
				'string.min': `${labels.name} must contain min {#limit} chars.`,
				'string.max': `${labels.name} should not have more than {#limit} chars.`,
				'any.required': `Please provide the ${labels.name}.`,
			}),
		code: Joi.string()
			.trim()
			.empty()
			.length(2)
			.required()
			.messages({
				'string.base': `${labels.code} should be a type of 'text'.`,
				'string.empty': `${labels.code} should not be empty.`,
				'string.length': `${labels.code} should be length of {#limit}.`,
				'any.required': `Please provide the ${labels.code}.`,
			}),
		flag: Joi.string()
			.trim()
			.empty()
			.required()
			.messages({
				'string.base': `${labels.flag} should be a type of 'text'.`,
				'string.empty': `Please provide the ${labels.flag}`,
				'any.required': `Please provide the ${labels.flag}.`,
			}),
	});
	return schema;
};
