const mongoose = require('mongoose');

const initializeDatabase = async () => {
  const mongoUri = process.env.MONGODB_URI;

  // Keep startup beginner-friendly.
  // If the MongoDB URI is not configured yet, we log a message and continue.
  if (!mongoUri || mongoUri === 'your_mongodb_connection_string_here') {
    console.log('MongoDB is not configured yet. Add a real MONGODB_URI to enable auth.');
    return;
  }

  if (mongoose.connection.readyState === 1) {
    console.log('MongoDB is already connected.');
    return;
  }

  await mongoose.connect(mongoUri);
  console.log('MongoDB connected successfully.');
};

module.exports = {
  initializeDatabase
};
