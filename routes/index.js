const express = require('express');
const router = express.Router();

// Swagger docs
router.use('/api-docs', require('./swagger')); 

// Route groups for your new project
router.use('/games', require('./games')); // All /games routes
router.use('/users', require('./users')); // All /users routes

// Root test route
router.get('/', (req, res) => {
  //#swagger.tags = ["Index Route"]
  res.send('API is working!');
});

module.exports = router;
