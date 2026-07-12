# Side Projects

## Overview
This project is a Node.js + Express application that demonstrates authentication, protected routes, product browsing, and image uploads using EJS views and MongoDB.

The app starts from [server.js](server.js), loads [src/app.js](src/app.js), and uses route modules from [src/routes](src/routes).

## Features
- User registration and login
- JWT-based authentication with cookie storage
- Protected product and profile routes
- Product listing page
- Add-product form with image upload using Multer
- User profile page with account overview and quick actions
- Reusable EJS partials for layout, navbar, and footer
- MongoDB-backed product storage

## Project Structure
- [server.js](server.js) — starts the server
- [src/app.js](src/app.js) — configures Express, middleware, routing, and view engine
- [src/controllers](src/controllers) — route handlers for auth and products
- [src/routes](src/routes) — application routes
- [src/models](src/models) — Mongoose models
- [src/views](src/views) — EJS templates and partials
- [src/middlewares](src/middlewares) — auth, protection, upload, and error handling

## Setup
1. Install dependencies:
   ```bash
   npm install
   ```
2. Create a `.env` file in the project root with these values:
   - `PORT`
   - `BASE_URL`
   - `MONGO_URI`
   - `NODE_ENV`
   - `JWT_SECRET`
3. Start the app in development mode:
   ```bash
   npm run dev
   ```

## Routes
### Test Routes
| Method | Route | Description |
|--------|-------|-------------|
| GET | `/test` | Renders a basic server health page |
| GET | `/test-error` | Triggers a sample error for testing |

### Auth Routes
| Method | Route | Description |
|--------|-------|-------------|
| GET | `/auth/register` | Shows the registration form |
| POST | `/auth/register` | Registers a new user and issues a JWT cookie |
| GET | `/auth/login` | Shows the login form |
| POST | `/auth/login` | Authenticates the user and issues a JWT cookie |

### Product Routes
| Method | Route | Description |
|--------|-------|-------------|
| GET | `/products` | Displays the products page |
| GET | `/products/add` | Shows the add-product form |
| POST | `/products/add` | Uploads a product image and creates a product |

### User Routes
| Method | Route | Description |
|--------|-------|-------------|
| GET | `/user/profile` | Shows the authenticated user profile page |

## Important Files
- [src/config/configEnv.js](src/config/configEnv.js) — loads environment variables
- [src/config/configDB.js](src/config/configDB.js) — connects to MongoDB
- [src/middlewares/protected.js](src/middlewares/protected.js) — protects authenticated routes
- [src/middlewares/upload.js](src/middlewares/upload.js) — handles image uploads for products
- [src/middlewares/errorHandler.js](src/middlewares/errorHandler.js) — global error handler

## Dependencies
- express
- ejs
- mongoose
- jsonwebtoken
- bcrypt
- cookie-parser
- morgan
- multer
- dotenv
- nodemon

