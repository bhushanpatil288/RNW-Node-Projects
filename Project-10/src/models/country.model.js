const mongoose = require('mongoose');

const countrySchema = new mongoose.Schema(
  {
    country: {
      type: String,
      required: [true, 'Country name is required'],
      maxlength: 50,
      trim: true,
    },
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'last_update' },
  }
);

module.exports = mongoose.model('Country', countrySchema);
