const createCrudService = require('./base.service');
const ApiError = require('../utils/apiError');
const Category = require('../models/category.model');
const Language = require('../models/language.model');
const Country = require('../models/country.model');
const City = require('../models/city.model');
const Address = require('../models/address.model');
const Store = require('../models/store.model');
const Staff = require('../models/staff.model');
const Inventory = require('../models/inventory.model');
const Rental = require('../models/rental.model');
const Payment = require('../models/payment.model');

// --- Category Service ---
const categoryService = createCrudService(Category, 'Category', {
  searchFields: ['name'],
  defaultSort: 'name',
});

// --- Language Service ---
const languageService = createCrudService(Language, 'Language', {
  searchFields: ['name'],
  defaultSort: 'name',
});

// --- Country Service ---
const countryService = createCrudService(Country, 'Country', {
  searchFields: ['country'],
  defaultSort: 'country',
});

// --- City Service ---
const cityService = createCrudService(City, 'City', {
  populateFields: [{ path: 'country' }],
  searchFields: ['city'],
  defaultSort: 'city',
});

// --- Address Service ---
const addressService = createCrudService(Address, 'Address', {
  populateFields: [
    {
      path: 'city',
      populate: { path: 'country' },
    },
  ],
  searchFields: ['district', 'postal_code'],
  defaultSort: 'address',
});

// --- Store Service ---
const storeService = createCrudService(Store, 'Store', {
  populateFields: [
    {
      path: 'address',
      populate: {
        path: 'city',
        populate: { path: 'country' },
      },
    },
    { path: 'manager_staff', select: 'first_name last_name' },
  ],
  defaultSort: '-created_at',
});

/**
 * Get inventory for a store
 */
storeService.getInventoryByStoreId = async (storeId) => {
  const store = await Store.findById(storeId);
  if (!store) throw ApiError.notFound(`Store with ID ${storeId} not found`);

  return Inventory.find({ store: storeId })
    .populate('film', 'title rating rental_rate')
    .lean();
};

/**
 * Get staff for a store
 */
storeService.getStaffByStoreId = async (storeId) => {
  const store = await Store.findById(storeId);
  if (!store) throw ApiError.notFound(`Store with ID ${storeId} not found`);

  return Staff.find({ store: storeId })
    .select('-password -picture')
    .lean();
};

// --- Staff Service ---
const staffService = createCrudService(Staff, 'Staff', {
  populateFields: [
    {
      path: 'address',
      populate: {
        path: 'city',
        populate: { path: 'country' },
      },
    },
    { path: 'store', select: '_id' },
  ],
  searchFields: ['first_name', 'last_name', 'email', 'active'],
  defaultSort: 'first_name',
});

// --- Inventory Service ---
const inventoryService = createCrudService(Inventory, 'Inventory', {
  populateFields: [
    { path: 'film', select: 'title rating' },
    { path: 'store', select: '_id' },
  ],
  searchFields: ['film', 'store'],
  defaultSort: '-created_at',
});

// --- Rental Service ---
const rentalService = createCrudService(Rental, 'Rental', {
  populateFields: [
    {
      path: 'inventory',
      populate: { path: 'film', select: 'title' },
    },
    { path: 'customer', select: 'first_name last_name email' },
    { path: 'staff', select: 'first_name last_name' },
  ],
  searchFields: ['customer', 'staff', 'inventory'],
  defaultSort: '-rental_date',
});

// --- Payment Service ---
const paymentService = createCrudService(Payment, 'Payment', {
  populateFields: [
    { path: 'customer', select: 'first_name last_name' },
    { path: 'staff', select: 'first_name last_name' },
    { path: 'rental', select: 'rental_date return_date' },
  ],
  searchFields: ['customer', 'staff', 'rental'],
  defaultSort: '-payment_date',
});

module.exports = {
  categoryService,
  languageService,
  countryService,
  cityService,
  addressService,
  storeService,
  staffService,
  inventoryService,
  rentalService,
  paymentService,
};
