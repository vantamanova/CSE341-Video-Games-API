const express = require('express');
const passport = require('passport');
const router = express.Router();

// Swagger docs
router.use('/api-docs', require('./swagger')); 

// Route groups for your new project
router.use('/games', require('./games')); // All /games routes
router.use('/users', require('./users')); // All /users routes

// Root test route
router.get('/api', (req, res) => {
  //#swagger.tags = ["Index Route"]
  res.send('API is working!');
});

router.get('/login', passport.authenticate('github'), (req, res) => {
  // This function will not be called as the request will be redirected to GitHub for authentication
});

router.get('/logout', function (req, res, next) {
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/');
  });
});

module.exports = router;
