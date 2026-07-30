const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Category name is required'],
      maxlength: 25,
      trim: true,
      unique: true,
    },
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'last_update' },
  }
);

module.exports = mongoose.model('Category', categorySchema);
