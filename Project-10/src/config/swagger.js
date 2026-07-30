const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'DVD Rental API',
      version: '1.0.0',
      description:
        'Production-ready REST API for the DVD Rental database (Pagila/Sakila schema). ' +
        'Provides full CRUD operations for actors, films, customers, rentals, payments, ' +
        'and all supporting resources.',
      contact: {
        name: 'API Support',
      },
      license: {
        name: 'ISC',
      },
    },
    servers: [
      {
        url: '/api/v1',
        description: 'API v1',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    tags: [
      { name: 'Auth', description: 'Authentication endpoints' },
      { name: 'Actors', description: 'Actor management' },
      { name: 'Films', description: 'Film management' },
      { name: 'Categories', description: 'Category management' },
      { name: 'Languages', description: 'Language management' },
      { name: 'Customers', description: 'Customer management' },
      { name: 'Rentals', description: 'Rental management' },
      { name: 'Payments', description: 'Payment management' },
      { name: 'Inventory', description: 'Inventory management' },
      { name: 'Stores', description: 'Store management' },
      { name: 'Staff', description: 'Staff management' },
      { name: 'Addresses', description: 'Address management' },
      { name: 'Cities', description: 'City management' },
      { name: 'Countries', description: 'Country management' },
    ],
  },
  apis: ['./src/routes/*.js'],
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
