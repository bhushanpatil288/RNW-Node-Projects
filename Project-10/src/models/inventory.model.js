const mongoose = require('mongoose');

const inventorySchema = new mongoose.Schema(
  {
    film: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Film',
      required: [true, 'Film is required'],
    },
    store: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Store',
      required: [true, 'Store is required'],
    },
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'last_update' },
  }
);

inventorySchema.index({ film: 1, store: 1 });

module.exports = mongoose.model('Inventory', inventorySchema);
