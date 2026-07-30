const Joi = require('joi');

// MongoDB ObjectId pattern
const objectId = Joi.string().regex(/^[0-9a-fA-F]{24}$/).message('Invalid ID format');

const createFilm = {
  body: Joi.object({
    title: Joi.string().max(255).required(),
    description: Joi.string().allow(null, ''),
    release_year: Joi.number().integer().min(1900).max(2100),
    language: objectId.required(),
    original_language: objectId.allow(null),
    rental_duration: Joi.number().integer().min(1).default(3),
    rental_rate: Joi.number().precision(2).min(0).default(4.99),
    length: Joi.number().integer().min(1).allow(null),
    replacement_cost: Joi.number().precision(2).min(0).default(19.99),
    rating: Joi.string().valid('G', 'PG', 'PG-13', 'R', 'NC-17').default('G'),
    special_features: Joi.array().items(
      Joi.string().valid('Trailers', 'Commentaries', 'Deleted Scenes', 'Behind the Scenes')
    ),
    revenue_projection: Joi.number().precision(2).allow(null),
    actors: Joi.array().items(objectId),
    categories: Joi.array().items(objectId),
  }),
};

const updateFilm = {
  params: Joi.object({
    id: objectId.required(),
  }),
  body: Joi.object({
    title: Joi.string().max(255),
    description: Joi.string().allow(null, ''),
    release_year: Joi.number().integer().min(1900).max(2100),
    language: objectId,
    original_language: objectId.allow(null),
    rental_duration: Joi.number().integer().min(1),
    rental_rate: Joi.number().precision(2).min(0),
    length: Joi.number().integer().min(1).allow(null),
    replacement_cost: Joi.number().precision(2).min(0),
    rating: Joi.string().valid('G', 'PG', 'PG-13', 'R', 'NC-17'),
    special_features: Joi.array().items(
      Joi.string().valid('Trailers', 'Commentaries', 'Deleted Scenes', 'Behind the Scenes')
    ),
    revenue_projection: Joi.number().precision(2).allow(null),
    actors: Joi.array().items(objectId),
    categories: Joi.array().items(objectId),
  }).min(1),
};

const getFilm = {
  params: Joi.object({
    id: objectId.required(),
  }),
};

const listFilms = {
  query: Joi.object({
    page: Joi.number().integer().min(1),
    limit: Joi.number().integer().min(1).max(100),
    sort: Joi.string().valid('title', 'release_year', 'rental_rate', 'length', 'rating', 'created_at', 'last_update'),
    order: Joi.string().valid('ASC', 'DESC', 'asc', 'desc'),
    title: Joi.string().max(255),
    rating: Joi.string().valid('G', 'PG', 'PG-13', 'R', 'NC-17'),
    release_year: Joi.number().integer(),
  }),
};

module.exports = { createFilm, updateFilm, getFilm, listFilms };
