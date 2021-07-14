const mongoose = require('mongoose');
exports.brandSchemaObj = {
	name: {
		type: String,
		required: true,
		trim: true,
	},
	slug: {
		type: String,
		required: true,
		trim: true,
		unique: true,
		index: true,
	},
	image: String,
	is_active: Boolean,
	created_by: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'users',
		required: true,
	},
	updated_by: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'users',
		required: true,
	},
};
