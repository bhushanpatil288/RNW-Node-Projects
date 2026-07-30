const router = require('express').Router();
const actorController = require('../controllers/actor.controller');
const validate = require('../middlewares/validate.middleware');
const { createActor, updateActor, getActor, listActors } = require('../validators/actor.validator');
const { authenticate } = require('../middlewares/auth.middleware');

/**
 * @swagger
 * components:
 *   schemas:
 *     Actor:
 *       type: object
 *       properties:
 *         actor_id:
 *           type: integer
 *         first_name:
 *           type: string
 *         last_name:
 *           type: string
 *         last_update:
 *           type: string
 *           format: date-time
 */

/**
 * @swagger
 * /api/v1/actors:
 *   get:
 *     summary: Get all actors
 *     tags: [Actors]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *       - in: query
 *         name: first_name
 *         schema:
 *           type: string
 *       - in: query
 *         name: last_name
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of actors
 */
router.get('/', validate(listActors), actorController.getAll);

/**
 * @swagger
 * /api/v1/actors/{id}:
 *   get:
 *     summary: Get actor by ID
 *     tags: [Actors]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Actor details
 *       404:
 *         description: Actor not found
 */
router.get('/:id', validate(getActor), actorController.getById);

/**
 * @swagger
 * /api/v1/actors/{id}/films:
 *   get:
 *     summary: Get films by actor
 *     tags: [Actors]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Films by this actor
 */
router.get('/:id/films', validate(getActor), actorController.getFilms);

// Protected routes (require authentication)
router.use(authenticate);

/**
 * @swagger
 * /api/v1/actors:
 *   post:
 *     summary: Create a new actor
 *     tags: [Actors]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [first_name, last_name]
 *             properties:
 *               first_name:
 *                 type: string
 *               last_name:
 *                 type: string
 *     responses:
 *       201:
 *         description: Actor created
 */
router.post('/', validate(createActor), actorController.create);

/**
 * @swagger
 * /api/v1/actors/{id}:
 *   put:
 *     summary: Update an actor
 *     tags: [Actors]
 *     security:
 *       - bearerAuth: []
 */
router.put('/:id', validate(updateActor), actorController.update);
router.patch('/:id', validate(updateActor), actorController.update);

/**
 * @swagger
 * /api/v1/actors/{id}:
 *   delete:
 *     summary: Delete an actor
 *     tags: [Actors]
 *     security:
 *       - bearerAuth: []
 */
router.delete('/:id', validate(getActor), actorController.remove);

module.exports = router;
