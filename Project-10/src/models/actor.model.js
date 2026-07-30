const mongoose = require('mongoose');

const actorSchema = new mongoose.Schema(
  {
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
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'last_update' },
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Index for search
actorSchema.index({ first_name: 1, last_name: 1 });

module.exports = mongoose.model('Actor', actorSchema);
