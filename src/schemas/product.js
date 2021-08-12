const mongoose = require("mongoose");
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
  shortDescription: {
    type: String,
    trim: true,
    max: 200,
  },
  images: Array,
  thumbnailImage: String,
  isActive: {
    type: Boolean,
    default: true,
  },
  categories: [
    {
      category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "categories",
      },
    },
  ],
  rating: {
    type: Number,
    default: 0,
  },
  isBestselling: {
    type: Boolean,
    default: false,
  },
  isNewArrival: {
    type: Boolean,
    default: true,
  },
  relatedProducts: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "products",
      },
    },
  ],
  tags: Array,
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "admins",
    required: true,
  },
  updatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "admins",
    required: true,
  },
  brand: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "brands",
  },
};
