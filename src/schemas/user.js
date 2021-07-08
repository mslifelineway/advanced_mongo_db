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
	},
	password: {
		type: String,
		required: true,
		min: 8,
		max: 15,
		trim: true,
	},
	phoneNumber: {
		type: Number,
		required: true,
		min: 10,
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
