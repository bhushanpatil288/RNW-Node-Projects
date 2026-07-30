const createCrudController = require('./base.controller');
const catchAsync = require('../utils/catchAsync');
const ApiResponse = require('../utils/apiResponse');
const filmService = require('../services/film.service');

const filmController = createCrudController(filmService, 'Film');

/**
 * GET /films/:id/actors - Get actors in a film
 */
filmController.getActors = catchAsync(async (req, res) => {
  const actors = await filmService.getActorsByFilmId(req.params.id);
  ApiResponse.success(res, 200, 'Actors in film retrieved', actors);
});

/**
 * GET /films/:id/categories - Get categories of a film
 */
filmController.getCategories = catchAsync(async (req, res) => {
  const categories = await filmService.getCategoriesByFilmId(req.params.id);
  ApiResponse.success(res, 200, 'Categories of film retrieved', categories);
});

module.exports = filmController;
