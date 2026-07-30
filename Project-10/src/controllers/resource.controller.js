const createCrudController = require('./base.controller');
const catchAsync = require('../utils/catchAsync');
const ApiResponse = require('../utils/apiResponse');
const {
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
} = require('../services/resource.service');

// --- Category ---
const categoryController = createCrudController(categoryService, 'Category');

// --- Language ---
const languageController = createCrudController(languageService, 'Language');

// --- Country ---
const countryController = createCrudController(countryService, 'Country');

// --- City ---
const cityController = createCrudController(cityService, 'City');

// --- Address ---
const addressController = createCrudController(addressService, 'Address');

// --- Store ---
const storeController = createCrudController(storeService, 'Store');

storeController.getInventory = catchAsync(async (req, res) => {
  const inventory = await storeService.getInventoryByStoreId(req.params.id);
  ApiResponse.success(res, 200, 'Store inventory retrieved', inventory);
});

storeController.getStaff = catchAsync(async (req, res) => {
  const staff = await storeService.getStaffByStoreId(req.params.id);
  ApiResponse.success(res, 200, 'Store staff retrieved', staff);
});

// --- Staff ---
const staffController = createCrudController(staffService, 'Staff');

// --- Inventory ---
const inventoryController = createCrudController(inventoryService, 'Inventory');

// --- Rental ---
const rentalController = createCrudController(rentalService, 'Rental');

// --- Payment ---
const paymentController = createCrudController(paymentService, 'Payment');

module.exports = {
  categoryController,
  languageController,
  countryController,
  cityController,
  addressController,
  storeController,
  staffController,
  inventoryController,
  rentalController,
  paymentController,
};
