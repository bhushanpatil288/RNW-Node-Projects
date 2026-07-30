const mongoose = require('mongoose');

const rentalSchema = new mongoose.Schema(
  {
    rental_date: {
      type: Date,
      required: [true, 'Rental date is required'],
    },
    inventory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Inventory',
      required: [true, 'Inventory is required'],
    },
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Customer',
      required: [true, 'Customer is required'],
    },
    return_date: {
      type: Date,
      default: null,
    },
    staff: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Staff',
      required: [true, 'Staff is required'],
    },
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'last_update' },
  }
);

rentalSchema.index({ customer: 1, rental_date: -1 });
rentalSchema.index({ inventory: 1 });
rentalSchema.index({ staff: 1 });

module.exports = mongoose.model('Rental', rentalSchema);
