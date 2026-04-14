const express = require('express');

const { verifyToken, checkRole } = require('../middleware/auth.middleware');

const router = express.Router();

// This route only checks if the user is logged in with a valid token.
router.get('/protected', verifyToken, (req, res) => {
  return res.status(200).json({
    success: true,
    message: 'You are authorized',
    data: {
      user: req.user
    }
  });
});

// This route checks both login status and admin role.
router.get('/admin', verifyToken, checkRole('admin'), (req, res) => {
  return res.status(200).json({
    success: true,
    message: 'Welcome Admin',
    data: {
      user: req.user
    }
  });
});

module.exports = router;
