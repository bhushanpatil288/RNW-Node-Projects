const Joi = require('joi');

// MongoDB ObjectId pattern
const objectId = Joi.string().regex(/^[0-9a-fA-F]{24}$/).message('Invalid ID format');

// --- Category ---
const createCategory = {
  body: Joi.object({
    name: Joi.string().max(25).required(),
  }),
};

const updateCategory = {
  params: Joi.object({ id: objectId.required() }),
  body: Joi.object({ name: Joi.string().max(25) }).min(1),
};

// --- Language ---
const createLanguage = {
  body: Joi.object({
    name: Joi.string().max(20).required(),
  }),
};

const updateLanguage = {
  params: Joi.object({ id: objectId.required() }),
  body: Joi.object({ name: Joi.string().max(20) }).min(1),
};

// --- Country ---
const createCountry = {
  body: Joi.object({
    country: Joi.string().max(50).required(),
  }),
};

const updateCountry = {
  params: Joi.object({ id: objectId.required() }),
  body: Joi.object({ country: Joi.string().max(50) }).min(1),
};

// --- City ---
const createCity = {
  body: Joi.object({
    city: Joi.string().max(50).required(),
    country: objectId.required(),
  }),
};

const updateCity = {
  params: Joi.object({ id: objectId.required() }),
  body: Joi.object({
    city: Joi.string().max(50),
    country: objectId,
  }).min(1),
};

// --- Address ---
const createAddress = {
  body: Joi.object({
    address: Joi.string().max(50).required(),
    address2: Joi.string().max(50).allow(null, ''),
    district: Joi.string().max(20).required(),
    city: objectId.required(),
    postal_code: Joi.string().max(10).allow(null, ''),
    phone: Joi.string().max(20).required(),
  }),
};

const updateAddress = {
  params: Joi.object({ id: objectId.required() }),
  body: Joi.object({
    address: Joi.string().max(50),
    address2: Joi.string().max(50).allow(null, ''),
    district: Joi.string().max(20),
    city: objectId,
    postal_code: Joi.string().max(10).allow(null, ''),
    phone: Joi.string().max(20),
  }).min(1),
};

// --- Store ---
const createStore = {
  body: Joi.object({
    manager_staff: objectId.required(),
    address: objectId.required(),
  }),
};

const updateStore = {
  params: Joi.object({ id: objectId.required() }),
  body: Joi.object({
    manager_staff: objectId,
    address: objectId,
  }).min(1),
};

// --- Staff ---
const createStaff = {
  body: Joi.object({
    first_name: Joi.string().max(45).required(),
    last_name: Joi.string().max(45).required(),
    address: objectId.required(),
    email: Joi.string().email().max(50).allow(null, ''),
    store: objectId.required(),
    active: Joi.boolean().default(true),
    username: Joi.string().max(16).required(),
    password: Joi.string().max(100).required(),
  }),
};

const updateStaff = {
  params: Joi.object({ id: objectId.required() }),
  body: Joi.object({
    first_name: Joi.string().max(45),
    last_name: Joi.string().max(45),
    address: objectId,
    email: Joi.string().email().max(50).allow(null, ''),
    store: objectId,
    active: Joi.boolean(),
    username: Joi.string().max(16),
    password: Joi.string().max(100),
  }).min(1),
};

// --- Inventory ---
const createInventory = {
  body: Joi.object({
    film: objectId.required(),
    store: objectId.required(),
  }),
};

const updateInventory = {
  params: Joi.object({ id: objectId.required() }),
  body: Joi.object({
    film: objectId,
    store: objectId,
  }).min(1),
};

// --- Rental ---
const createRental = {
  body: Joi.object({
    rental_date: Joi.date().required(),
    inventory: objectId.required(),
    customer: objectId.required(),
    return_date: Joi.date().allow(null),
    staff: objectId.required(),
  }),
};

const updateRental = {
  params: Joi.object({ id: objectId.required() }),
  body: Joi.object({
    rental_date: Joi.date(),
    inventory: objectId,
    customer: objectId,
    return_date: Joi.date().allow(null),
    staff: objectId,
  }).min(1),
};

// --- Payment ---
const createPayment = {
  body: Joi.object({
    customer: objectId.required(),
    staff: objectId.required(),
    rental: objectId.required(),
    amount: Joi.number().precision(2).min(0).required(),
    payment_date: Joi.date().required(),
  }),
};

const updatePayment = {
  params: Joi.object({ id: objectId.required() }),
  body: Joi.object({
    customer: objectId,
    staff: objectId,
    rental: objectId,
    amount: Joi.number().precision(2).min(0),
    payment_date: Joi.date(),
  }).min(1),
};

// --- Common ---
const getById = {
  params: Joi.object({
    id: objectId.required(),
  }),
};

const listQuery = {
  query: Joi.object({
    page: Joi.number().integer().min(1),
    limit: Joi.number().integer().min(1).max(100),
    sort: Joi.string(),
    order: Joi.string().valid('ASC', 'DESC', 'asc', 'desc'),
  }),
};

// --- Auth ---
const login = {
  body: Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
  }),
};

const refreshToken = {
  body: Joi.object({
    refreshToken: Joi.string().required(),
  }),
};

module.exports = {
  createCategory, updateCategory,
  createLanguage, updateLanguage,
  createCountry, updateCountry,
  createCity, updateCity,
  createAddress, updateAddress,
  createStore, updateStore,
  createStaff, updateStaff,
  createInventory, updateInventory,
  createRental, updateRental,
  createPayment, updatePayment,
  getById, listQuery,
  login, refreshToken,
};
