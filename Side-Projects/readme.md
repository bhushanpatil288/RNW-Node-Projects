# Side Projects

## Overview
This project is a Node.js + Express application for learning full-stack basics with authentication, protected routes, product management, and image uploads. It uses EJS for rendering, MongoDB for persistence, and JWT cookies for session handling.

The app starts from [server.js](server.js), loads [src/app.js](src/app.js), and routes requests through [src/routes](src/routes).

## Features
- User registration and login
- JWT-based authentication with cookie storage
- Protected product and profile pages
- Product listing and add-product flow
- Image upload support for products using Multer
- User profile page with account access
- Reusable EJS views and partials
- MongoDB-backed data storage

## Project Structure
- [server.js](server.js) — starts the server and connects to the database
- [src/app.js](src/app.js) — configures Express, middleware, view engine, and routing
- [src/controllers](src/controllers) — handles auth, product, and user requests
- [src/routes](src/routes) — defines the app routes
- [src/models](src/models) — Mongoose models
- [src/views](src/views) — EJS templates and partials
- [src/middlewares](src/middlewares) — auth protection, upload handling, and error handling

## Setup
1. Install dependencies:
   ```bash
   npm install
   ```
2. Create a `.env` file in the project root with the following variables:
   - `PORT`
   - `BASE_URL`
   - `MONGO_URI`
   - `NODE_ENV`
   - `JWT_SECRET`
3. Start the application in development mode:
   ```bash
   npm run dev
   ```

## Routes
### Test Routes
| Method | Route | Description |
|--------|-------|-------------|
| GET | `/test` | Renders a basic test page |
| GET | `/test-error` | Triggers a sample error for testing |

### Auth Routes
| Method | Route | Description |
|--------|-------|-------------|
| GET | `/auth/register` | Shows the registration form |
| POST | `/auth/register` | Registers a user and creates a session cookie |
| GET | `/auth/login` | Shows the login form |
| POST | `/auth/login` | Authenticates a user and creates a session cookie |

### Product Routes
| Method | Route | Description |
|--------|-------|-------------|
| GET | `/products` | Displays the products page |
| GET | `/products/add` | Shows the add-product form |
| POST | `/products/add` | Uploads a product image and creates a product |
| DELETE | `/products/remove/:id` | Removes a product by ID |

### User Routes
| Method | Route | Description |
|--------|-------|-------------|
| GET | `/user/profile` | Shows the authenticated profile page |

## Main Files
- [src/config/configEnv.js](src/config/configEnv.js) — loads environment variables
- [src/middlewares/protected.js](src/middlewares/protected.js) — protects authenticated routes
- [src/middlewares/upload.js](src/middlewares/upload.js) — handles image uploads
- [src/middlewares/errorHandler.js](src/middlewares/errorHandler.js) — global error handling

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

