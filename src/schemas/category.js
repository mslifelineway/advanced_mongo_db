const mongoose = require('mongoose');
exports.categorySchemaObj = {
	name: {
		type: String,
		trim: true,
		require: true,
		min: 3,
		max: 100,
	},
	slug: {
		type: String,
		trim: true,
		require: true,
		min: 3,
		unique: true,
		index: true,
	},
	description: {
		type: String,
		trim: true,
	},
	short_description: {
		type: String,
		trim: true,
	},
	image: {
		type: String,
		trim: true,
	},
	is_active: {
		type: Boolean,
		default: true,
	},
	sub_categories: [
		{
			category: {
				type: mongoose.Schema.Types.ObjectId,
				ref: 'categories',
			},
		},
	],
	created_by: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'admins',
		require: true,
	},
	updated_by: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'admins',
		require: true,
	},
};
