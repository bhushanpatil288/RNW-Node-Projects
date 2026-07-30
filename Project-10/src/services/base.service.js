const ApiError = require('../utils/apiError');
const { parsePagination, buildPaginationMeta } = require('../utils/pagination');

/**
 * Generic CRUD service factory for Mongoose models.
 *
 * @param {object} Model - Mongoose model
 * @param {string} modelName - Human-readable model name (for error messages)
 * @param {object} [options] - Additional options
 * @param {Array} [options.populateFields] - Default populate paths
 * @param {object} [options.searchFields] - Fields to allow filtering on
 * @param {string} [options.defaultSort] - Default sort field
 */
const createCrudService = (Model, modelName, options = {}) => {
  const {
    populateFields = [],
    searchFields = [],
    defaultSort = '-created_at',
  } = options;

  /**
   * Get all records with pagination, filtering, and sorting.
   */
  const getAll = async (query) => {
    const { offset, limit, page } = parsePagination(query);

    // Build sort string for Mongoose
    const sortField = query.sort || defaultSort;
    const sortOrder = query.order && query.order.toUpperCase() === 'DESC' ? '-' : '';
    const sort = query.sort ? `${sortOrder}${sortField}` : defaultSort;

    // Build filter from query params (only allowed search fields)
    const filter = {};
    searchFields.forEach((field) => {
      if (query[field] !== undefined && query[field] !== '') {
        // For string fields, use case-insensitive regex
        if (typeof query[field] === 'string' && !field.endsWith('_id') && field !== 'active') {
          filter[field] = { $regex: query[field], $options: 'i' };
        } else {
          filter[field] = query[field];
        }
      }
    });

    const [data, totalItems] = await Promise.all([
      Model.find(filter)
        .populate(populateFields)
        .sort(sort)
        .skip(offset)
        .limit(limit)
        .lean(),
      Model.countDocuments(filter),
    ]);

    const meta = buildPaginationMeta(totalItems, page, limit);

    return { data, meta };
  };

  /**
   * Get a single record by ID.
   */
  const getById = async (id) => {
    const record = await Model.findById(id).populate(populateFields).lean();

    if (!record) {
      throw ApiError.notFound(`${modelName} with ID ${id} not found`);
    }

    return record;
  };

  /**
   * Create a new record.
   */
  const create = async (data) => {
    const record = await Model.create(data);
    // Return with populates
    return Model.findById(record._id).populate(populateFields).lean();
  };

  /**
   * Update a record by ID.
   */
  const update = async (id, data) => {
    const record = await Model.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    })
      .populate(populateFields)
      .lean();

    if (!record) {
      throw ApiError.notFound(`${modelName} with ID ${id} not found`);
    }

    return record;
  };

  /**
   * Delete a record by ID.
   */
  const remove = async (id) => {
    const record = await Model.findByIdAndDelete(id);

    if (!record) {
      throw ApiError.notFound(`${modelName} with ID ${id} not found`);
    }

    return record;
  };

  return { getAll, getById, create, update, remove };
};

module.exports = createCrudService;
