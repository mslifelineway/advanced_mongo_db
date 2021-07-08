const mongoose = require('mongoose');
exports.userSchemaObj = {
	name: {
		type: String,
		require: true,
		min: 3,
		max: 50,
		trim: true,
	},
	email: {
		type: String,
		require: true,
		min: 6,
		max: 50,
		trim: true,
	},
	password: {
		type: String,
		require: true,
		min: 8,
		max: 15,
		trim: true,
	},
	contactNumber: {
		type: Number,
		require: true,
		min: 10,
		trim: true,
	},
	dob: {
		type: Date,
		require: true,
	},
	country: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'countries',
		require: true,
	},
};
