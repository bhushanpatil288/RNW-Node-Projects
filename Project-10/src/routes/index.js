const router = require('express').Router();

// Import route modules
const authRoutes = require('./auth.routes');
const actorRoutes = require('./actor.routes');
const filmRoutes = require('./film.routes');
const customerRoutes = require('./customer.routes');
const resourceRoutes = require('./resource.routes');

// Mount routes
router.use('/auth', authRoutes);
router.use('/actors', actorRoutes);
router.use('/films', filmRoutes);
router.use('/customers', customerRoutes);

// All other resource routes (categories, languages, countries, cities,
// addresses, stores, staff, inventory, rentals, payments)
router.use('/', resourceRoutes);

module.exports = router;
