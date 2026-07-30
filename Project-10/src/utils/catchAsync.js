/**
 * Wraps an async route handler to catch errors and forward them
 * to the Express error handling middleware.
 *
 * @param {Function} fn - Async function (req, res, next) => Promise
 * @returns {Function} Express middleware function
 */
const catchAsync = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

module.exports = catchAsync;
