const mongoose = require('mongoose');

const citySchema = new mongoose.Schema(
  {
    city: {
      type: String,
      required: [true, 'City name is required'],
      maxlength: 50,
      trim: true,
    },
    country: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Country',
      required: [true, 'Country is required'],
    },
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'last_update' },
  }
);

citySchema.index({ country: 1 });

module.exports = mongoose.model('City', citySchema);
