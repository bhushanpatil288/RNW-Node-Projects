const mongoose = require('mongoose');

const filmSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      maxlength: 255,
      trim: true,
    },
    description: {
      type: String,
      default: null,
    },
    release_year: {
      type: Number,
      min: 1900,
      max: 2100,
    },
    language: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Language',
      required: [true, 'Language is required'],
    },
    original_language: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Language',
      default: null,
    },
    rental_duration: {
      type: Number,
      required: true,
      default: 3,
    },
    rental_rate: {
      type: Number,
      required: true,
      default: 4.99,
    },
    length: {
      type: Number,
      default: null,
    },
    replacement_cost: {
      type: Number,
      required: true,
      default: 19.99,
    },
    rating: {
      type: String,
      enum: ['G', 'PG', 'PG-13', 'R', 'NC-17'],
      default: 'G',
    },
    special_features: {
      type: [String],
      enum: ['Trailers', 'Commentaries', 'Deleted Scenes', 'Behind the Scenes'],
      default: [],
    },
    revenue_projection: {
      type: Number,
      default: null,
    },
    actors: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Actor',
      },
    ],
    categories: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
      },
    ],
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'last_update' },
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Indexes
filmSchema.index({ title: 'text', description: 'text' });
filmSchema.index({ rating: 1, release_year: 1 });
filmSchema.index({ language: 1 });

module.exports = mongoose.model('Film', filmSchema);
