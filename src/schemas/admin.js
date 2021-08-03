const mongoose = require("mongoose");
exports.adminSchemaObj = {
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
    ref: "countries",
    required: true,
  },
  is_active: {
    type: Boolean,
    default: true,
  },
  deactivated_at: {
    type: Date,
  },
  sessions: [
    {
      token: {
        type: String,
        required: true,
      },
      expiresAt: {
        type: Number,
        required: true,
      },
    },
  ],
};
