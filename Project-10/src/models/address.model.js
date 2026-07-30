const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema(
  {
    address: {
      type: String,
      required: [true, 'Address is required'],
      maxlength: 50,
      trim: true,
    },
    address2: {
      type: String,
      maxlength: 50,
      default: null,
    },
    district: {
      type: String,
      required: [true, 'District is required'],
      maxlength: 20,
      trim: true,
    },
    city: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'City',
      required: [true, 'City is required'],
    },
    postal_code: {
      type: String,
      maxlength: 10,
      default: null,
    },
    phone: {
      type: String,
      required: [true, 'Phone is required'],
      maxlength: 20,
    },
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'last_update' },
  }
);

addressSchema.index({ city: 1 });

module.exports = mongoose.model('Address', addressSchema);
