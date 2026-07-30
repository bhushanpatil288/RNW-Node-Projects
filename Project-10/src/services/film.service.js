const Film = require('../models/film.model');
const createCrudService = require('./base.service');
const ApiError = require('../utils/apiError');

const filmService = createCrudService(Film, 'Film', {
  populateFields: [
    { path: 'language', select: 'name' },
    { path: 'original_language', select: 'name' },
    { path: 'actors', select: 'first_name last_name' },
    { path: 'categories', select: 'name' },
  ],
  searchFields: ['title', 'rating', 'release_year'],
  defaultSort: 'title',
});

/**
 * Get actors in a film
 */
filmService.getActorsByFilmId = async (filmId) => {
  const film = await Film.findById(filmId)
    .populate('actors', 'first_name last_name')
    .lean();

  if (!film) {
    throw ApiError.notFound(`Film with ID ${filmId} not found`);
  }

  return film.actors;
};

/**
 * Get categories of a film
 */
filmService.getCategoriesByFilmId = async (filmId) => {
  const film = await Film.findById(filmId)
    .populate('categories', 'name')
    .lean();

  if (!film) {
    throw ApiError.notFound(`Film with ID ${filmId} not found`);
  }

  return film.categories;
};

module.exports = filmService;
