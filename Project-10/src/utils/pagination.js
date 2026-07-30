/**
 * Pagination helper for Sequelize queries.
 * Parses query params and returns Sequelize-compatible options + meta info.
 */

const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 20;
const MAX_LIMIT = 100;

/**
 * Parse pagination parameters from request query
 * @param {object} query - Express request query object
 * @returns {{ offset: number, limit: number, order: Array, page: number }}
 */
const parsePagination = (query) => {
  const page = Math.max(1, parseInt(query.page, 10) || DEFAULT_PAGE);
  const limit = Math.min(
    MAX_LIMIT,
    Math.max(1, parseInt(query.limit, 10) || DEFAULT_LIMIT)
  );
  const offset = (page - 1) * limit;

  // Sorting
  const sortField = query.sort || 'created_at';
  const sortOrder = query.order && query.order.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';
  const order = [[sortField, sortOrder]];

  return { offset, limit, order, page };
};

/**
 * Build pagination metadata for response
 * @param {number} totalItems - Total number of records
 * @param {number} page - Current page
 * @param {number} limit - Items per page
 * @returns {object} Pagination metadata
 */
const buildPaginationMeta = (totalItems, page, limit) => {
  const totalPages = Math.ceil(totalItems / limit);

  return {
    totalItems,
    totalPages,
    currentPage: page,
    itemsPerPage: limit,
    hasNextPage: page < totalPages,
    hasPrevPage: page > 1,
  };
};

module.exports = { parsePagination, buildPaginationMeta };
