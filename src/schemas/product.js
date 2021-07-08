exports.productSchemaObj = {
	name: {
		type: String,
		trim: true,
		require: true,
		min: 3,
		max: 100,
	},
	quantity: {
		type: Number,
		require: true,
		min: 1,
	},
	uom: {
		type: String,
		trim: true,
		require: true,
	},
	slug: {
		type: String,
		trim: true,
		require: true,
		min: 3,
		unique: true,
		index: true,
	},
	sku: {
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
	},
	is_bestselling: Boolean,
	is_new_arrival: Boolean,
	related_products: [
		{
			product: {
				type: mongoose.Schema.Types.ObjectId,
				ref: 'products',
			},
		},
	],
	product_tags: Array,
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
	brand: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'brands',
	},
};
