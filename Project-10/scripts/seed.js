/**
 * Seed script — populates MongoDB with sample data.
 *
 * Usage: node scripts/seed.js
 */

const mongoose = require('mongoose');
const { connectDB, disconnectDB } = require('../src/config/database');
const logger = require('../src/config/logger');

// Import all models
const Actor = require('../src/models/actor.model');
const Film = require('../src/models/film.model');
const Category = require('../src/models/category.model');
const Language = require('../src/models/language.model');
const Country = require('../src/models/country.model');
const City = require('../src/models/city.model');
const Address = require('../src/models/address.model');
const Customer = require('../src/models/customer.model');
const Staff = require('../src/models/staff.model');
const Store = require('../src/models/store.model');
const Inventory = require('../src/models/inventory.model');
const Rental = require('../src/models/rental.model');
const Payment = require('../src/models/payment.model');

const seedDatabase = async () => {
  try {
    await connectDB();

    // Clear existing data
    logger.info('Clearing existing data...');
    await Promise.all([
      Actor.deleteMany({}),
      Film.deleteMany({}),
      Category.deleteMany({}),
      Language.deleteMany({}),
      Country.deleteMany({}),
      City.deleteMany({}),
      Address.deleteMany({}),
      Customer.deleteMany({}),
      Staff.deleteMany({}),
      Store.deleteMany({}),
      Inventory.deleteMany({}),
      Rental.deleteMany({}),
      Payment.deleteMany({}),
    ]);

    // ===== SEED DATA =====

    // Languages
    const languages = await Language.insertMany([
      { name: 'English' },
      { name: 'Italian' },
      { name: 'Japanese' },
      { name: 'Mandarin' },
      { name: 'French' },
      { name: 'German' },
    ]);
    logger.info(`Seeded ${languages.length} languages`);

    // Countries
    const countries = await Country.insertMany([
      { country: 'United States' },
      { country: 'Canada' },
      { country: 'United Kingdom' },
      { country: 'Australia' },
      { country: 'India' },
    ]);
    logger.info(`Seeded ${countries.length} countries`);

    // Cities
    const cities = await City.insertMany([
      { city: 'New York', country: countries[0]._id },
      { city: 'Los Angeles', country: countries[0]._id },
      { city: 'Toronto', country: countries[1]._id },
      { city: 'London', country: countries[2]._id },
      { city: 'Sydney', country: countries[3]._id },
      { city: 'Mumbai', country: countries[4]._id },
    ]);
    logger.info(`Seeded ${cities.length} cities`);

    // Addresses
    const addresses = await Address.insertMany([
      { address: '123 Main St', district: 'Manhattan', city: cities[0]._id, postal_code: '10001', phone: '212-555-0100' },
      { address: '456 Hollywood Blvd', district: 'Hollywood', city: cities[1]._id, postal_code: '90028', phone: '310-555-0200' },
      { address: '789 Queen St', district: 'Downtown', city: cities[2]._id, postal_code: 'M5H2N2', phone: '416-555-0300' },
      { address: '10 Baker St', district: 'Westminster', city: cities[3]._id, postal_code: 'NW16XE', phone: '020-555-0400' },
      { address: '50 Harbour St', district: 'CBD', city: cities[4]._id, postal_code: '2000', phone: '02-555-0500' },
    ]);
    logger.info(`Seeded ${addresses.length} addresses`);

    // Staff (password will be auto-hashed by the pre-save hook)
    const staffMembers = await Staff.create([
      {
        first_name: 'Mike',
        last_name: 'Hillyer',
        address: addresses[0]._id,
        email: 'mike@dvdrental.com',
        store: new mongoose.Types.ObjectId(), // temp - will update after store creation
        active: true,
        username: 'admin',
        password: 'password123',
      },
      {
        first_name: 'Jon',
        last_name: 'Stephens',
        address: addresses[1]._id,
        email: 'jon@dvdrental.com',
        store: new mongoose.Types.ObjectId(), // temp
        active: true,
        username: 'staff',
        password: 'password123',
      },
    ]);
    logger.info(`Seeded ${staffMembers.length} staff members`);

    // Stores
    const stores = await Store.insertMany([
      { manager_staff: staffMembers[0]._id, address: addresses[0]._id },
      { manager_staff: staffMembers[1]._id, address: addresses[1]._id },
    ]);
    logger.info(`Seeded ${stores.length} stores`);

    // Update staff with correct store references
    await Staff.findByIdAndUpdate(staffMembers[0]._id, { store: stores[0]._id });
    await Staff.findByIdAndUpdate(staffMembers[1]._id, { store: stores[1]._id });
    logger.info('Updated staff store references');

    // Categories
    const categories = await Category.insertMany([
      { name: 'Action' },
      { name: 'Animation' },
      { name: 'Children' },
      { name: 'Classics' },
      { name: 'Comedy' },
      { name: 'Documentary' },
      { name: 'Drama' },
      { name: 'Family' },
      { name: 'Foreign' },
      { name: 'Games' },
      { name: 'Horror' },
      { name: 'Music' },
      { name: 'New' },
      { name: 'Sci-Fi' },
      { name: 'Sports' },
      { name: 'Travel' },
    ]);
    logger.info(`Seeded ${categories.length} categories`);

    // Actors
    const actors = await Actor.insertMany([
      { first_name: 'Penelope', last_name: 'Guiness' },
      { first_name: 'Nick', last_name: 'Wahlberg' },
      { first_name: 'Ed', last_name: 'Chase' },
      { first_name: 'Jennifer', last_name: 'Davis' },
      { first_name: 'Johnny', last_name: 'Lollobrigida' },
      { first_name: 'Bette', last_name: 'Nicholson' },
      { first_name: 'Grace', last_name: 'Mostel' },
      { first_name: 'Matthew', last_name: 'Johansson' },
      { first_name: 'Joe', last_name: 'Swank' },
      { first_name: 'Christian', last_name: 'Gable' },
    ]);
    logger.info(`Seeded ${actors.length} actors`);

    // Films (with embedded actor & category refs)
    const films = await Film.insertMany([
      {
        title: 'Academy Dinosaur',
        description: 'A Epic Drama of a Feminist And a Mad Scientist.',
        release_year: 2006,
        language: languages[0]._id,
        rental_duration: 6,
        rental_rate: 0.99,
        length: 86,
        replacement_cost: 20.99,
        rating: 'PG',
        actors: [actors[0]._id, actors[1]._id],
        categories: [categories[5]._id], // Documentary
      },
      {
        title: 'Ace Goldfinger',
        description: 'A Astounding Epistle of a Database Administrator.',
        release_year: 2006,
        language: languages[0]._id,
        rental_duration: 3,
        rental_rate: 4.99,
        length: 48,
        replacement_cost: 12.99,
        rating: 'G',
        actors: [actors[2]._id, actors[3]._id],
        categories: [categories[10]._id], // Horror
      },
      {
        title: 'Adaptation Holes',
        description: 'A Astounding Reflection of a Lumberjack.',
        release_year: 2006,
        language: languages[0]._id,
        rental_duration: 7,
        rental_rate: 2.99,
        length: 50,
        replacement_cost: 18.99,
        rating: 'NC-17',
        actors: [actors[4]._id, actors[5]._id],
        categories: [categories[5]._id], // Documentary
      },
      {
        title: 'Affair Prejudice',
        description: 'A Fanciful Documentary of a Frisbee And a Lumberjack.',
        release_year: 2006,
        language: languages[0]._id,
        rental_duration: 5,
        rental_rate: 2.99,
        length: 117,
        replacement_cost: 26.99,
        rating: 'G',
        actors: [actors[6]._id],
        categories: [categories[10]._id], // Horror
      },
      {
        title: 'African Egg',
        description: 'A Fast-Paced Documentary of a Pastry Chef.',
        release_year: 2006,
        language: languages[0]._id,
        rental_duration: 6,
        rental_rate: 2.99,
        length: 130,
        replacement_cost: 22.99,
        rating: 'G',
        actors: [actors[7]._id],
        categories: [categories[7]._id], // Family
      },
    ]);
    logger.info(`Seeded ${films.length} films`);

    // Customers
    const customers = await Customer.insertMany([
      { store: stores[0]._id, first_name: 'Mary', last_name: 'Smith', email: 'mary.smith@email.com', address: addresses[2]._id, activebool: true, active: 1 },
      { store: stores[0]._id, first_name: 'Patricia', last_name: 'Johnson', email: 'patricia.johnson@email.com', address: addresses[3]._id, activebool: true, active: 1 },
      { store: stores[1]._id, first_name: 'Linda', last_name: 'Williams', email: 'linda.williams@email.com', address: addresses[4]._id, activebool: true, active: 1 },
    ]);
    logger.info(`Seeded ${customers.length} customers`);

    // Inventory
    const inventoryItems = await Inventory.insertMany([
      { film: films[0]._id, store: stores[0]._id },
      { film: films[0]._id, store: stores[1]._id },
      { film: films[1]._id, store: stores[0]._id },
      { film: films[2]._id, store: stores[0]._id },
      { film: films[3]._id, store: stores[1]._id },
      { film: films[4]._id, store: stores[1]._id },
    ]);
    logger.info(`Seeded ${inventoryItems.length} inventory items`);

    // Rentals
    const rentals = await Rental.insertMany([
      { rental_date: new Date('2024-01-15'), inventory: inventoryItems[0]._id, customer: customers[0]._id, return_date: new Date('2024-01-20'), staff: staffMembers[0]._id },
      { rental_date: new Date('2024-01-16'), inventory: inventoryItems[2]._id, customer: customers[1]._id, return_date: new Date('2024-01-22'), staff: staffMembers[0]._id },
      { rental_date: new Date('2024-01-18'), inventory: inventoryItems[4]._id, customer: customers[2]._id, return_date: null, staff: staffMembers[1]._id },
    ]);
    logger.info(`Seeded ${rentals.length} rentals`);

    // Payments
    const payments = await Payment.insertMany([
      { customer: customers[0]._id, staff: staffMembers[0]._id, rental: rentals[0]._id, amount: 0.99, payment_date: new Date('2024-01-15') },
      { customer: customers[1]._id, staff: staffMembers[0]._id, rental: rentals[1]._id, amount: 4.99, payment_date: new Date('2024-01-16') },
      { customer: customers[2]._id, staff: staffMembers[1]._id, rental: rentals[2]._id, amount: 2.99, payment_date: new Date('2024-01-18') },
    ]);
    logger.info(`Seeded ${payments.length} payments`);

    logger.info('');
    logger.info('✅ Database seeding completed successfully!');
    logger.info('');
    logger.info('Test credentials:');
    logger.info('  Username: admin    Password: password123');
    logger.info('  Username: staff    Password: password123');

    await disconnectDB();
    process.exit(0);
  } catch (error) {
    logger.error('❌ Seeding failed:', error);
    process.exit(1);
  }
};

seedDatabase();
