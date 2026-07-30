// Import all Mongoose models
// Simply requiring them registers them with Mongoose
const Actor = require('./actor.model');
const Film = require('./film.model');
const Category = require('./category.model');
const Language = require('./language.model');
const Country = require('./country.model');
const City = require('./city.model');
const Address = require('./address.model');
const Customer = require('./customer.model');
const Staff = require('./staff.model');
const Store = require('./store.model');
const Inventory = require('./inventory.model');
const Rental = require('./rental.model');
const Payment = require('./payment.model');

module.exports = {
  Actor,
  Film,
  Category,
  Language,
  Country,
  City,
  Address,
  Customer,
  Staff,
  Store,
  Inventory,
  Rental,
  Payment,
};
