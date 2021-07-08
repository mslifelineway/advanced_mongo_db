const mongoose = require('mongoose');
exports.userSchemaObj = {
	name: {
		type: String,
		required: true,
		min: 3,
		max: 50,
		trim: true,
	},
	email: {
		type: String,
		required: true,
		min: 6,
		max: 50,
		trim: true,
		unique: true,
		index: true,
	},
	password: {
		type: String,
		required: true,
		trim: true,
	},
	phoneNumber: {
		type: String,
		required: true,
		trim: true,
	},
	dob: {
		type: Date,
		required: true,
	},
	country: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'countries',
		required: true,
	},
};
