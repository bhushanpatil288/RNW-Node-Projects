const createCrudController = require('./base.controller');
const catchAsync = require('../utils/catchAsync');
const ApiResponse = require('../utils/apiResponse');
const customerService = require('../services/customer.service');

const customerController = createCrudController(customerService, 'Customer');

/**
 * GET /customers/:id/rentals - Get rental history
 */
customerController.getRentals = catchAsync(async (req, res) => {
  const rentals = await customerService.getRentalsByCustomerId(req.params.id);
  ApiResponse.success(res, 200, 'Customer rental history retrieved', rentals);
});

/**
 * GET /customers/:id/payments - Get payment history
 */
customerController.getPayments = catchAsync(async (req, res) => {
  const payments = await customerService.getPaymentsByCustomerId(req.params.id);
  ApiResponse.success(res, 200, 'Customer payment history retrieved', payments);
});

module.exports = customerController;
