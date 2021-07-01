const mongoose = require('mongoose');
exports.brandSchemaObj = {
	name: {
		type: String,
		require: true,
		trim: true,
	},
	slug: {
		type: String,
		require: true,
		trim: true,
		unique: true,
		index: true,
	},
	image: String,
	is_active: Boolean,
	created_by: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'users',
		require: true,
	},
	updated_by: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'users',
		require: true,
	},
};
