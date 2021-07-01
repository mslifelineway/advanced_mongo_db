const Joi = require('joi');
exports.newUserSchema = () => {
	const schema = Joi.object({
		name: Joi.string().trim().alphanum().min(3).max(50).required().messages({
			'string.base': `Name should be a type of 'text'`,
			'string.alphanum': `Name must be alpha numeric only`,
			'string.empty': `Please provide your name`,
			'string.min': `Name must contain min {#limit} chars`,
			'string.max': `Name should not have more than {#limit} chars`,
			'any.required': `Please provide your name`,
		}),
		email: Joi.string()
			.trim()
			.empty()
			.min(6)
			.max(50)
			.email({
				minDomainSegments: 2,
				tlds: { allow: ['com', 'net', 'in', 'org'] },
			})
			.required()
			.messages({
				'string.base': `Email should be a type of 'text'`,
				'string.empty': `Please provide your email`,
				'string.min': `Email should have a minimum length of {#limit}'`,
				'string.email': `Only .com, .net, .in or .org allowed`,
				'any.required': `Please provide your email`,
			}),
		password: Joi.string()
			.trim()
			.empty()
			.min(8)
			.max(15)
			.pattern(new RegExp(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&])([a-zA-Z0-9@$!%*?&]{8,15})$/))
			.required()
			.messages({
				'string.base': `{#label} should be a type of 'text'`,
				'string.empty': `Please provide the password`,
				'string.min': 'Your password must contain at least {#limit} character',
				'string.max': 'Your password should not contain more than  {#limit} character',
				'string.pattern.base':
					' You password must contain one uppercase character, one lowercase character, one digit and one special character',
				'any.required': `Please provide the password`,
			}),
		confirm_password: Joi.any()
			.equal(Joi.ref('password'))
			.required()
			.options({ messages: { 'any.only': 'Confirm password does not match' } }),
	});
	return schema;
};
