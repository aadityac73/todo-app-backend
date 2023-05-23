const router = require('express').Router();

const authRoutes = require('./authRoutes');
router.use('/auth', authRoutes);

const todoRoutes = require('./todoRoutes');
router.use('/todo', todoRoutes);

module.exports = router;
