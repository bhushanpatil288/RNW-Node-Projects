const mongoose = require('mongoose');

const storeSchema = new mongoose.Schema(
  {
    manager_staff: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Staff',
      required: [true, 'Manager staff is required'],
    },
    address: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Address',
      required: [true, 'Address is required'],
    },
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'last_update' },
  }
);

module.exports = mongoose.model('Store', storeSchema);
