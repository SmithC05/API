const getTestMessage = (req, res) => {
  // Simple health-check style route for testing the API.
  res.status(200).json({
    success: true,
    message: 'Test route is working',
    data: {
      status: 'API is working'
    }
  });
};

module.exports = {
  getTestMessage
};
