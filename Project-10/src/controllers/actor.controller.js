const createCrudController = require('./base.controller');
const catchAsync = require('../utils/catchAsync');
const ApiResponse = require('../utils/apiResponse');
const actorService = require('../services/actor.service');

const actorController = createCrudController(actorService, 'Actor');

/**
 * GET /actors/:id/films - Get films by an actor
 */
actorController.getFilms = catchAsync(async (req, res) => {
  const films = await actorService.getFilmsByActorId(req.params.id);
  ApiResponse.success(res, 200, 'Films by actor retrieved', films);
});

module.exports = actorController;
