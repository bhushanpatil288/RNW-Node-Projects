const Joi = require('joi');

// MongoDB ObjectId pattern
const objectId = Joi.string().regex(/^[0-9a-fA-F]{24}$/).message('Invalid ID format');

const createActor = {
  body: Joi.object({
    first_name: Joi.string().max(45).required(),
    last_name: Joi.string().max(45).required(),
  }),
};

const updateActor = {
  params: Joi.object({
    id: objectId.required(),
  }),
  body: Joi.object({
    first_name: Joi.string().max(45),
    last_name: Joi.string().max(45),
  }).min(1),
};

const getActor = {
  params: Joi.object({
    id: objectId.required(),
  }),
};

const listActors = {
  query: Joi.object({
    page: Joi.number().integer().min(1),
    limit: Joi.number().integer().min(1).max(100),
    sort: Joi.string().valid('first_name', 'last_name', 'created_at', 'last_update'),
    order: Joi.string().valid('ASC', 'DESC', 'asc', 'desc'),
    first_name: Joi.string().max(45),
    last_name: Joi.string().max(45),
  }),
};

module.exports = { createActor, updateActor, getActor, listActors };
