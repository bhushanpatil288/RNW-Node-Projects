const router = require('express').Router();
const customerController = require('../controllers/customer.controller');
const validate = require('../middlewares/validate.middleware');
const { createCustomer, updateCustomer, getCustomer, listCustomers } = require('../validators/customer.validator');
const { authenticate } = require('../middlewares/auth.middleware');

router.get('/', validate(listCustomers), customerController.getAll);
router.get('/:id', validate(getCustomer), customerController.getById);
router.get('/:id/rentals', validate(getCustomer), customerController.getRentals);
router.get('/:id/payments', validate(getCustomer), customerController.getPayments);

// Protected routes
router.use(authenticate);
router.post('/', validate(createCustomer), customerController.create);
router.put('/:id', validate(updateCustomer), customerController.update);
router.patch('/:id', validate(updateCustomer), customerController.update);
router.delete('/:id', validate(getCustomer), customerController.remove);

module.exports = router;
