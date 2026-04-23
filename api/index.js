const app = require('../src/app.js');
const { initializeDatabase } = require('../src/config/db');

module.exports = async (req, res) => {
  try {
    // Ensure the database is connected before handling the request
    await initializeDatabase();
  } catch (error) {
    console.error('Database connection failed:', error);
    return res.status(500).json({
      success: false,
      message: 'Server configuration error',
      error: 'Failed to connect to the database. Make sure MONGODB_URI is correctly set in Vercel environment variables.'
    });
  }
  
  // Pass the request to the Express app
  return app(req, res);
};
