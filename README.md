# Task Management API with JWT Auth, RBAC, and Swagger

A clean Node.js and Express.js backend for user authentication and task management.

This project includes:
- JWT-based authentication
- Role-based access control for `user` and `admin`
- Protected task CRUD APIs
- Joi request validation
- Centralized error handling
- Swagger API documentation

The current implementation uses MongoDB with Mongoose.

## Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- JSON Web Token (JWT)
- bcrypt
- Joi
- Swagger (`swagger-ui-express` and `swagger-jsdoc`)

## Project Structure

```text
.
+-- Dockerfile
+-- README.md
+-- docker-compose.yml
+-- package.json
`-- src
    +-- app.js
    +-- config
    |   +-- db.js
    |   `-- swagger.js
    +-- controllers
    |   +-- authController.js
    |   +-- task.controller.js
    |   `-- testController.js
    +-- middleware
    |   +-- auth.middleware.js
    |   +-- error.middleware.js
    |   +-- logger.js
    |   `-- validate.middleware.js
    +-- models
    |   +-- task.model.js
    |   `-- user.model.js
    +-- routes
    |   +-- auth.routes.js
    |   +-- index.js
    |   +-- protected.routes.js
    |   `-- task.routes.js
    `-- utils
        +-- createError.js
        +-- generateToken.js
        `-- validation.js
```

## Setup Instructions

### 1. Clone the repository

```bash
git clone <your-repository-url>
cd API
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create the environment file

Create a `.env` file in the project root. You can copy from `.env.example`.

```env
PORT=5000
JWT_SECRET=your_secure_jwt_secret
JWT_EXPIRES_IN=1d
MONGODB_URI=mongodb://localhost:27017/task_manager_api
```

### 4. Start the server

```bash
npm start
```

For development mode:

```bash
npm run dev
```

The API will run at:

```text
http://localhost:5000
```

## API Endpoints

### Auth Routes

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/v1/auth/register` | Register a new user |
| POST | `/api/v1/auth/login` | Login and receive a JWT token |

### Task Routes

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/v1/tasks` | Create a task for the logged-in user |
| GET | `/api/v1/tasks` | Get all tasks for the logged-in user, or all tasks for admin |
| GET | `/api/v1/tasks/:id` | Get a single task by id |
| PUT | `/api/v1/tasks/:id` | Update a task by id |
| DELETE | `/api/v1/tasks/:id` | Delete a task by id |

### Utility Routes

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v1/test` | Test route |
| GET | `/api/v1/protected` | Protected route for logged-in users |
| GET | `/api/v1/admin` | Admin-only route |

## API Documentation

Swagger documentation is available at:

```text
/api-docs
```

Example:

```text
http://localhost:5000/api-docs
```

## Features

- JWT Authentication
- Role-based access control
- Protected routes
- Task CRUD APIs
- Input validation with Joi
- Centralized error handling
- Swagger API docs
- Modular project structure

## Request and Response Format

### Success Response

```json
{
  "success": true,
  "message": "Task created successfully",
  "data": {
    "task": {
      "id": "661b70391d09e53d2c9b5678",
      "title": "Finish assignment",
      "description": "Complete backend submission",
      "userId": "661b6f9d1d09e53d2c9b1234"
    }
  }
}
```

### Error Response

```json
{
  "success": false,
  "message": "Bad input",
  "error": "Title is required"
}
```

## Future Improvements

- Refresh token support
- Pagination and filtering for tasks
- Rate limiting for auth routes
- Docker-based deployment pipeline
- Redis caching for repeated reads
- Automated tests with Jest or Supertest
- CI/CD pipeline for deployment

## Scalability Overview

This project is already organized in a modular way with separate controllers, routes, middleware, models, and utilities. That makes it easier to add features without turning the codebase into one large file. In production, the API can scale horizontally by running multiple server instances behind a load balancer.

For database performance, indexes can be added on important fields like `email` and `userId`. Frequently requested data can be cached with Redis to reduce direct database reads. As the system grows further, features like authentication, task management, and notifications can be split into separate microservices when needed.

## Notes for Evaluators

- The backend uses MongoDB in its current implementation.
- Swagger is available for quick API testing.
- Protected routes require `Authorization: Bearer <token>`.
- Regular users can only access their own tasks.
- Admin users can access all tasks.
