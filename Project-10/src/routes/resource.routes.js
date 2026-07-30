const router = require('express').Router();
const validate = require('../middlewares/validate.middleware');
const { authenticate } = require('../middlewares/auth.middleware');
const { getById, listQuery } = require('../validators/common.validator');
const {
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
} = require('../validators/common.validator');
const {
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
} = require('../controllers/resource.controller');

/**
 * Helper to build standard CRUD routes for a resource.
 * GET routes are public, write routes require authentication.
 */
const buildCrudRoutes = (controller, createSchema, updateSchema, extraRoutes = []) => {
  const r = require('express').Router();

  // Public read routes
  r.get('/', validate(listQuery), controller.getAll);
  r.get('/:id', validate(getById), controller.getById);

  // Extra public routes (relationships)
  extraRoutes.forEach(({ method, path, handler }) => {
    r[method](path, validate(getById), handler);
  });

  // Protected write routes
  r.use(authenticate);
  r.post('/', validate(createSchema), controller.create);
  r.put('/:id', validate(updateSchema), controller.update);
  r.patch('/:id', validate(updateSchema), controller.update);
  r.delete('/:id', validate(getById), controller.remove);

  return r;
};

// --- Category Routes ---
router.use('/categories', buildCrudRoutes(categoryController, createCategory, updateCategory));

// --- Language Routes ---
router.use('/languages', buildCrudRoutes(languageController, createLanguage, updateLanguage));

// --- Country Routes ---
router.use('/countries', buildCrudRoutes(countryController, createCountry, updateCountry));

// --- City Routes ---
router.use('/cities', buildCrudRoutes(cityController, createCity, updateCity));

// --- Address Routes ---
router.use('/addresses', buildCrudRoutes(addressController, createAddress, updateAddress));

// --- Store Routes ---
router.use(
  '/stores',
  buildCrudRoutes(storeController, createStore, updateStore, [
    { method: 'get', path: '/:id/inventory', handler: storeController.getInventory },
    { method: 'get', path: '/:id/staff', handler: storeController.getStaff },
  ])
);

// --- Staff Routes ---
router.use('/staff', buildCrudRoutes(staffController, createStaff, updateStaff));

// --- Inventory Routes ---
router.use('/inventory', buildCrudRoutes(inventoryController, createInventory, updateInventory));

// --- Rental Routes ---
router.use('/rentals', buildCrudRoutes(rentalController, createRental, updateRental));

// --- Payment Routes ---
router.use('/payments', buildCrudRoutes(paymentController, createPayment, updatePayment));

module.exports = router;
