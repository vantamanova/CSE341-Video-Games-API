const validator = require('../helpers/validate'); // W03 Validation helper

// W03 Middleware to validate game data

const saveGame = (req, res, next) => {
  const validationRule = {
    title: 'required|string',
    genre: 'required|string',
    platform: 'required|string',
    releaseDate: 'required|date',
    developer: 'required|string',
    rating: 'required|integer|min:0|max:10',
    priceUSD: 'required|numeric|min:0'
  };
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: 'Validation failed',
        data: err
      });
    } else {
      next();
    }
  });
};

const saveUser = (req, res, next) => {
  const validationRule = {
    username: 'required|string',
    email: 'required|email',
    dateOfBirth: 'required|date',
    favoriteGenre: 'required|string',
    platformPreference: 'required|string',
    hoursPlayedPerWeek: 'required|integer|min:0',
    ownedGames: 'array',
    isPremiumMember: 'boolean',
    createdAt: 'required|date'
  };
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: 'Validation failed',
        data: err
      });
    } else {
      next();
    }
  });
};


module.exports = {
  saveGame,
  saveUser
};