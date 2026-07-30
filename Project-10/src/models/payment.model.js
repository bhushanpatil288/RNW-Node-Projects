const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema(
  {
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Customer',
      required: [true, 'Customer is required'],
    },
    staff: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Staff',
      required: [true, 'Staff is required'],
    },
    rental: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Rental',
      required: [true, 'Rental is required'],
    },
    amount: {
      type: Number,
      required: [true, 'Amount is required'],
      min: 0,
    },
    payment_date: {
      type: Date,
      required: [true, 'Payment date is required'],
    },
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'last_update' },
  }
);

paymentSchema.index({ customer: 1, payment_date: -1 });
paymentSchema.index({ staff: 1 });
paymentSchema.index({ rental: 1 });

module.exports = mongoose.model('Payment', paymentSchema);
