const Actor = require('../models/actor.model');
const Film = require('../models/film.model');
const createCrudService = require('./base.service');
const ApiError = require('../utils/apiError');

const actorService = createCrudService(Actor, 'Actor', {
  searchFields: ['first_name', 'last_name'],
  defaultSort: 'first_name',
});

/**
 * Get films by actor ID
 */
actorService.getFilmsByActorId = async (actorId) => {
  const actor = await Actor.findById(actorId);
  if (!actor) {
    throw ApiError.notFound(`Actor with ID ${actorId} not found`);
  }

  const films = await Film.find({ actors: actorId })
    .populate('language', 'name')
    .select('title description release_year rating rental_rate length language')
    .lean();

  return films;
};

module.exports = actorService;
