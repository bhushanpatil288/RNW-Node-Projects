const mongoose = require('mongoose');

const languageSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Language name is required'],
      maxlength: 20,
      trim: true,
      unique: true,
    },
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'last_update' },
  }
);

module.exports = mongoose.model('Language', languageSchema);
