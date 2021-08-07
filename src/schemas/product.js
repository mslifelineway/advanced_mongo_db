const mongoose = require('mongoose');
exports.productSchemaObj = {
	name: {
		type: String,
		trim: true,
		required: true,
		min: 3,
		max: 200,
	},
	quantity: {
		type: Number,
		required: true,
		min: 1,
	},
	uom: {
		type: String,
		trim: true,
		required: true,
	},
	slug: {
		type: String,
		trim: true,
		required: true,
		min: 3,
		unique: true,
		index: true,
	},
	sku: {
		type: String,
		trim: true,
		required: true,
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
	images: [
		{
			image: {
				type: String,
				trim: true,
			},
		},
	],
	thumbnail_image: String,
	is_active: {
		type: Boolean,
		default: true,
	},
	categories: [
		{
			category: {
				type: mongoose.Schema.Types.ObjectId,
				ref: 'categories',
			},
		},
	],
	rating: {
		type: Number,
		default: 0,
	},
	is_bestselling: {
		type: Boolean,
		default: false,
	},
	is_new_arrival: {
		type: Boolean,
		default: true,
	},
	related_products: [
		{
			product: {
				type: mongoose.Schema.Types.ObjectId,
				ref: 'products',
			},
		},
	],
	tags: Array,
	created_by: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'admins',
		required: true,
	},
	updated_by: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'admins',
		required: true,
	},
	brand: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'brands',
	},
};
