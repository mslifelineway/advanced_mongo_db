exports.countrySchemaObj = {
  name: {
    type: String,
    trim: true,
    required: true,
  },
  slug: {
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
    uppercase: true,
  },
  flag: {
    type: String,
    trim: true,
    required: true,
  },
  is_active: {
    type: Boolean,
    default: true,
  },
  deactivated_at: {
    type: Date,
  },
};
