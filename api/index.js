const app = require('../src/app.js');
const { initializeDatabase } = require('../src/config/db');

module.exports = async (req, res) => {
  // Ensure the database is connected before handling the request
  await initializeDatabase();
  
  // Pass the request to the Express app
  return app(req, res);
};
