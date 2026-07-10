# PROJECT INFO

## Overview
This project is a Node.js + Express app using EJS views, MongoDB, JWT authentication, and cookie-based session handling. The application starts from `server.js`, loads `src/app.js`, and uses routes defined in `src/routes`.

## Setup
1. Install dependencies:
   ```bash
   npm install
   ```
2. Create a `.env` file in the project root with these keys:
   - `PORT`
   - `BASE_URL`
   - `MONGO_URI`
   - `NODE_ENV`
   - `JWT_SECRET`
3. Start the app in development mode:
   ```bash
   npm run dev
   ```

## Entry Point
- `server.js` starts the app
- `src/app.js` configures Express, middlewares, routes, and error handling

## Routes
### Test Routes
Base: `/`
| Method | Route | Description |
|--------|-------|-------------|
| GET | `/test` | Renders the test route view |
| GET | `/test-error` | Throws a test error to exercise error handling |

### Auth Routes
Base: `/auth`
| Method | Route | Description |
|--------|-------|-------------|
| GET | `/auth/register` | Registration page (currently protected by auth middleware) |
| POST | `/auth/register` | Creates a new user and issues a JWT cookie |

### Product Routes
Base: `/`
| Method | Route | Description |
|--------|-------|-------------|
| GET | `/products` | Renders the products page |

> Note: In the current code, `/auth/register` is protected by `authMiddleware`, while `/products` is not protected.

## Utilities
- `src/utils/genToken.js`
  - Creates a JWT from an object payload
  - Uses `JWT_SECRET` and expires in 1 day
- `src/utils/decryptToken.js`
  - Verifies and decodes a JWT
  - Returns decoded payload or `false` on failure

## Important Files
- `src/config/configEnv.js` — loads required environment variables
- `src/config/configDB.js` — connects to MongoDB
- `src/middlewares/authMiddleware.js` — validates JWT cookie and sets `req.user`
- `src/middlewares/errorHandler.js` — global error handler

## Dependencies
- `express`
- `ejs`
- `mongoose`
- `jsonwebtoken`
- `bcrypt`
- `cookie-parser`
- `morgan`
- `dotenv`
- `nodemon`

