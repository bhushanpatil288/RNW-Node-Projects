const router = require('express').Router();
const authController = require('../controllers/auth.controller');
const validate = require('../middlewares/validate.middleware');
const { login, refreshToken } = require('../validators/common.validator');
const { authLimiter } = require('../middlewares/rateLimiter.middleware');

/**
 * @swagger
 * /api/v1/auth/login:
 *   post:
 *     summary: Staff login
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [username, password]
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 *       401:
 *         description: Invalid credentials
 */
router.post('/login', authLimiter, validate(login), authController.login);

/**
 * @swagger
 * /api/v1/auth/refresh:
 *   post:
 *     summary: Refresh access token
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [refreshToken]
 *             properties:
 *               refreshToken:
 *                 type: string
 *     responses:
 *       200:
 *         description: Token refreshed
 *       401:
 *         description: Invalid refresh token
 */
router.post('/refresh', authLimiter, validate(refreshToken), authController.refresh);

module.exports = router;
