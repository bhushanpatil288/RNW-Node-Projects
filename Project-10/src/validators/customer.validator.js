const Joi = require('joi');

// MongoDB ObjectId pattern
const objectId = Joi.string().regex(/^[0-9a-fA-F]{24}$/).message('Invalid ID format');

const createCustomer = {
  body: Joi.object({
    store: objectId.required(),
    first_name: Joi.string().max(45).required(),
    last_name: Joi.string().max(45).required(),
    email: Joi.string().email().max(50).allow(null, ''),
    address: objectId.required(),
    activebool: Joi.boolean().default(true),
    active: Joi.number().integer().valid(0, 1),
  }),
};

const updateCustomer = {
  params: Joi.object({
    id: objectId.required(),
  }),
  body: Joi.object({
    store: objectId,
    first_name: Joi.string().max(45),
    last_name: Joi.string().max(45),
    email: Joi.string().email().max(50).allow(null, ''),
    address: objectId,
    activebool: Joi.boolean(),
    active: Joi.number().integer().valid(0, 1),
  }).min(1),
};

const getCustomer = {
  params: Joi.object({
    id: objectId.required(),
  }),
};

const listCustomers = {
  query: Joi.object({
    page: Joi.number().integer().min(1),
    limit: Joi.number().integer().min(1).max(100),
    sort: Joi.string().valid('first_name', 'last_name', 'email', 'create_date', 'last_update'),
    order: Joi.string().valid('ASC', 'DESC', 'asc', 'desc'),
    first_name: Joi.string().max(45),
    last_name: Joi.string().max(45),
    email: Joi.string().max(50),
    active: Joi.number().integer().valid(0, 1),
  }),
};

module.exports = { createCustomer, updateCustomer, getCustomer, listCustomers };
