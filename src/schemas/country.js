exports.countrySchemaObj = {
	name: {
		type: String,
		trim: true,
		required: true,
		unique: true,
		index: true,
	},
	code: {
		type: String,
		trim: true,
		required: true,
		length: 2,
		unique: true,
		index: true,
	},
	flag: {
		type: String,
		trim: true,
		required: true,
	},
};
