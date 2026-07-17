# Admin ERP - Backend

Node.js + Express + MongoDB (Mongoose) backend for Admin ERP.

## Setup

1. Install dependencies:
   ```
   npm install
   ```

2. Copy `.env.example` to `.env` and update values:
   ```
   cp .env.example .env
   ```

3. Make sure MongoDB is running locally, or update `MONGO_URI` to point to your Atlas cluster.

4. Start the dev server (auto-restarts on file changes):
   ```
   npm run dev
   ```

   Server runs at `http://localhost:5000` by default.

## Folder structure

```
backend/
├── server.js                  # entry point
├── src/
│   ├── app.js                 # express app, middleware, route mounting
│   ├── config/
│   │   └── db.js              # mongodb connection
│   ├── models/
│   │   └── User.js            # user schema (auth + roles: admin/manager/employee)
│   ├── controllers/
│   │   └── authController.js  # register/login/me logic
│   ├── routes/
│   │   └── authRoutes.js      # /api/auth/*
│   ├── middleware/
│   │   ├── authMiddleware.js  # JWT protect + role-based authorize
│   │   └── errorMiddleware.js # centralized error handling
│   └── utils/
│       └── generateToken.js   # JWT signing helper
```

## What's ready

- User model with hashed passwords (bcrypt) and roles.
- JWT-based auth: `POST /api/auth/register`, `POST /api/auth/login`, `GET /api/auth/me` (protected).
- Role-based access control helper (`authorize("admin")`) ready to use on new routes.
- Centralized error handling and 404 handler.
- CORS configured for the frontend (`CLIENT_URL` in `.env`).
- Health check: `GET /api/health`.

## Next steps for the team

Each ERP module (employees, inventory, payroll, attendance, etc.) should follow the same pattern:

1. Add a schema in `src/models/`
2. Add a controller in `src/controllers/`
3. Add routes in `src/routes/`
4. Mount the route in `src/app.js`

Example:
```js
// src/app.js
import employeeRoutes from "./routes/employeeRoutes.js";
app.use("/api/employees", employeeRoutes);
```

Use `protect` and `authorize("admin", "manager")` middleware on routes that need auth/role checks.
