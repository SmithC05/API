require('dotenv').config();

const express = require('express');

const { initializeDatabase } = require('./config/db');
const setupSwagger = require('./config/swagger');
const routes = require('./routes');
const requestLogger = require('./middleware/logger');
const createError = require('./utils/createError');
const errorMiddleware = require('./middleware/error.middleware');

const app = express();
const PORT = process.env.PORT || 5000;

// Log every request in a simple beginner-friendly way.
app.use(requestLogger);

// Parse JSON request bodies like { "name": "Alice" }.
app.use(express.json());

// Swagger UI for quick API testing and documentation.
setupSwagger(app);

// All version 1 API routes will start with /api/v1.
app.use('/api/v1', routes);

// If no route matches, create a simple 404 error.
app.use((req, res, next) => {
  next(createError(404, 'Route not found', `${req.method} ${req.originalUrl} does not exist`));
});

// Keep the error handler last so it can catch errors from above.
app.use(errorMiddleware);

const startServer = async () => {
  try {
    // Connect to MongoDB before starting the server.
    await initializeDatabase();

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error.message);
    process.exit(1);
  }
};

// Only start the server when this file is run directly.
if (require.main === module) {
  startServer();
}

module.exports = app;
