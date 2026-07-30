# DVD Rental API (MongoDB Version)

Production-ready REST API built with **Express.js**, **Mongoose ODM**, and **MongoDB** for the DVD Rental database (Pagila/Sakila schema).

## Features

- 🎬 **Full CRUD** for 13 resources (actors, films, customers, rentals, payments, etc.)
- 🔐 **JWT Authentication** with access + refresh tokens
- ✅ **Request Validation** with Joi schemas
- 📊 **Pagination, Sorting & Filtering** on all list endpoints
- 🚦 **Rate Limiting** (general + strict auth limiter)
- 🛡️ **Security** — Helmet, CORS, HPP, parameterized queries
- 📝 **Logging** — Winston with daily file rotation
- 📚 **Swagger/OpenAPI** documentation at `/api-docs`
- 🐳 **Docker** + Docker Compose ready
- ❤️ **Health Check** endpoint at `/health`
- 🔄 **Graceful Shutdown** (SIGTERM/SIGINT handling)

## Quick Start

### Prerequisites

- **Node.js** >= 18
- **MongoDB** >= 6.0 (or use Docker)

### Option 1: Docker (Recommended)

Since `docker-compose` is standard, we can run:

```bash
# Start MongoDB + API
docker compose up -d

# Seed the database
docker compose exec api node scripts/seed.js
```

### Option 2: Local Development

```bash
# 1. Install dependencies
npm install

# 2. Configure environment
cp .env.example .env
# Edit .env with your MongoDB credentials (MONGO_URI)

# 3. Seed sample data
npm run db:seed

# 4. Start development server
npm run dev
```

The API will be available at `http://localhost:3000`.

## API Documentation

Interactive Swagger UI is available at: **[http://localhost:3000/api-docs](http://localhost:3000/api-docs)**

## API Endpoints

### Authentication

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/v1/auth/login` | Staff login → JWT tokens |
| POST | `/api/v1/auth/refresh` | Refresh access token |

### Resources (CRUD)

Each resource supports: `GET /` (list), `GET /:id` (detail), `POST /` (create), `PUT /:id` (update), `PATCH /:id` (partial update), `DELETE /:id` (delete).

| Resource | Base Path |
|----------|-----------|
| Actors | `/api/v1/actors` |
| Films | `/api/v1/films` |
| Categories | `/api/v1/categories` |
| Languages | `/api/v1/languages` |
| Customers | `/api/v1/customers` |
| Rentals | `/api/v1/rentals` |
| Payments | `/api/v1/payments` |
| Inventory | `/api/v1/inventory` |
| Stores | `/api/v1/stores` |
| Staff | `/api/v1/staff` |
| Addresses | `/api/v1/addresses` |
| Cities | `/api/v1/cities` |
| Countries | `/api/v1/countries` |

### Relationship Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v1/actors/:id/films` | Films by actor |
| GET | `/api/v1/films/:id/actors` | Actors in a film |
| GET | `/api/v1/films/:id/categories` | Categories of a film |
| GET | `/api/v1/customers/:id/rentals` | Customer rental history |
| GET | `/api/v1/customers/:id/payments` | Customer payment history |
| GET | `/api/v1/stores/:id/inventory` | Store inventory |
| GET | `/api/v1/stores/:id/staff` | Store staff members |

### Pagination & Filtering

```bash
# Pagination
GET /api/v1/films?page=2&limit=10

# Sorting
GET /api/v1/films?sort=title&order=ASC

# Filtering
GET /api/v1/films?rating=PG&release_year=2006

# Combined
GET /api/v1/actors?first_name=Penelope&sort=last_name&order=DESC&page=1&limit=5
```

## Authentication

Write operations (POST, PUT, PATCH, DELETE) require a JWT token. Read operations (GET) are public.

```bash
# 1. Login to get tokens
curl -X POST http://localhost:3000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username": "admin", "password": "password123"}'

# 2. Use the access token
curl http://localhost:3000/api/v1/actors \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"

# 3. Create a resource (requires auth)
curl -X POST http://localhost:3000/api/v1/actors \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"first_name": "Tom", "last_name": "Hanks"}'
```

### Test Credentials

| Username | Password | Role |
|----------|----------|------|
| admin | password123 | Manager (Store 1) |
| staff | password123 | Staff (Store 2) |

## Project Structure

```
├── src/
│   ├── config/          # Database, environment, logger, swagger config
│   ├── controllers/     # Request handlers (base + per-resource)
│   ├── middlewares/      # Auth, error handling, validation, rate limiting
│   ├── models/          # Mongoose models (13) + associations
│   ├── routes/          # Express routes + Swagger docs
│   ├── services/        # Business logic layer (base + per-resource)
│   ├── utils/           # ApiError, ApiResponse, catchAsync, pagination
│   ├── validators/      # Joi validation schemas
│   └── app.js           # Express app setup
├── scripts/             # DB seed script
├── server.js            # Entry point
├── Dockerfile           # Multi-stage Docker build
├── docker-compose.yml   # App + MongoDB
└── package.json
```

## Scripts

| Script | Description |
|--------|-------------|
| `npm start` | Start production server |
| `npm run dev` | Start development server (nodemon) |
| `npm run db:seed` | Seed sample data |
| `npm run lint` | Run ESLint |
| `npm run lint:fix` | Fix ESLint errors |
| `npm run format` | Format with Prettier |
| `npm test` | Run tests |
| `npm run test:coverage` | Run tests with coverage |

## License

ISC
