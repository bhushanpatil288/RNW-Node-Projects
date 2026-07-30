const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema(
  {
    store: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Store',
      required: [true, 'Store is required'],
    },
    first_name: {
      type: String,
      required: [true, 'First name is required'],
      maxlength: 45,
      trim: true,
    },
    last_name: {
      type: String,
      required: [true, 'Last name is required'],
      maxlength: 45,
      trim: true,
    },
    email: {
      type: String,
      maxlength: 50,
      trim: true,
      lowercase: true,
      default: null,
    },
    address: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Address',
      required: [true, 'Address is required'],
    },
    activebool: {
      type: Boolean,
      default: true,
    },
    active: {
      type: Number,
      default: 1,
    },
  },
  {
    timestamps: { createdAt: 'create_date', updatedAt: 'last_update' },
  }
);

customerSchema.index({ store: 1 });
customerSchema.index({ email: 1 });
customerSchema.index({ first_name: 1, last_name: 1 });

module.exports = mongoose.model('Customer', customerSchema);
