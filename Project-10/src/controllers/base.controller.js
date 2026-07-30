const catchAsync = require('../utils/catchAsync');
const ApiResponse = require('../utils/apiResponse');

/**
 * Generic CRUD controller factory.
 * Creates standard controller methods for any service.
 *
 * @param {object} service - Service object with getAll, getById, create, update, remove methods
 * @param {string} resourceName - Human-readable resource name
 */
const createCrudController = (service, resourceName) => {
  const getAll = catchAsync(async (req, res) => {
    const result = await service.getAll(req.query);
    ApiResponse.success(res, 200, `${resourceName} list retrieved`, result.data, result.meta);
  });

  const getById = catchAsync(async (req, res) => {
    const record = await service.getById(req.params.id);
    ApiResponse.success(res, 200, `${resourceName} retrieved`, record);
  });

  const create = catchAsync(async (req, res) => {
    const record = await service.create(req.body);
    ApiResponse.created(res, `${resourceName} created successfully`, record);
  });

  const update = catchAsync(async (req, res) => {
    const record = await service.update(req.params.id, req.body);
    ApiResponse.success(res, 200, `${resourceName} updated successfully`, record);
  });

  const remove = catchAsync(async (req, res) => {
    await service.remove(req.params.id);
    ApiResponse.noContent(res);
  });

  return { getAll, getById, create, update, remove };
};

module.exports = createCrudController;
