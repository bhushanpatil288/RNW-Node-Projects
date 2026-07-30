const router = require('express').Router();
const filmController = require('../controllers/film.controller');
const validate = require('../middlewares/validate.middleware');
const { createFilm, updateFilm, getFilm, listFilms } = require('../validators/film.validator');
const { authenticate } = require('../middlewares/auth.middleware');

/**
 * @swagger
 * /api/v1/films:
 *   get:
 *     summary: Get all films
 *     tags: [Films]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema: { type: integer }
 *       - in: query
 *         name: limit
 *         schema: { type: integer }
 *       - in: query
 *         name: title
 *         schema: { type: string }
 *       - in: query
 *         name: rating
 *         schema: { type: string, enum: [G, PG, PG-13, R, NC-17] }
 *       - in: query
 *         name: release_year
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: List of films
 */
router.get('/', validate(listFilms), filmController.getAll);
router.get('/:id', validate(getFilm), filmController.getById);
router.get('/:id/actors', validate(getFilm), filmController.getActors);
router.get('/:id/categories', validate(getFilm), filmController.getCategories);

// Protected routes
router.use(authenticate);
router.post('/', validate(createFilm), filmController.create);
router.put('/:id', validate(updateFilm), filmController.update);
router.patch('/:id', validate(updateFilm), filmController.update);
router.delete('/:id', validate(getFilm), filmController.remove);

module.exports = router;
