const Customer = require('../models/customer.model');
const Rental = require('../models/rental.model');
const Payment = require('../models/payment.model');
const createCrudService = require('./base.service');
const ApiError = require('../utils/apiError');

const customerService = createCrudService(Customer, 'Customer', {
  populateFields: [
    { path: 'store', select: '_id' },
    {
      path: 'address',
      populate: {
        path: 'city',
        populate: { path: 'country' },
      },
    },
  ],
  searchFields: ['first_name', 'last_name', 'email', 'store', 'active'],
  defaultSort: 'first_name',
});

/**
 * Get rental history for a customer
 */
customerService.getRentalsByCustomerId = async (customerId) => {
  const customer = await Customer.findById(customerId);
  if (!customer) {
    throw ApiError.notFound(`Customer with ID ${customerId} not found`);
  }

  const rentals = await Rental.find({ customer: customerId })
    .populate({
      path: 'inventory',
      populate: { path: 'film', select: 'title rating' },
    })
    .populate('staff', 'first_name last_name')
    .sort('-rental_date')
    .lean();

  return rentals;
};

/**
 * Get payment history for a customer
 */
customerService.getPaymentsByCustomerId = async (customerId) => {
  const customer = await Customer.findById(customerId);
  if (!customer) {
    throw ApiError.notFound(`Customer with ID ${customerId} not found`);
  }

  const payments = await Payment.find({ customer: customerId })
    .populate({
      path: 'rental',
      populate: {
        path: 'inventory',
        populate: { path: 'film', select: 'title' },
      },
    })
    .populate('staff', 'first_name last_name')
    .sort('-payment_date')
    .lean();

  return payments;
};

module.exports = customerService;
