const express = require('express');

const { getTestMessage } = require('../controllers/testController');
const authRoutes = require('./auth.routes');
const protectedRoutes = require('./protected.routes');
const taskRoutes = require('./task.routes');

const router = express.Router();

// Central place to register API routes.
router.get('/test', getTestMessage);
router.use('/auth', authRoutes);
router.use('/tasks', taskRoutes);
router.use('/', protectedRoutes);

module.exports = router;
