// Import dependencies
const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('./database/connect');
const app = express();
const passport = require('passport');
const session = require('express-session');
const GitHubStrategy = require('passport-github2').Strategy;
const cors = require('cors');

// Port
const PORT = process.env.PORT || 3000;

app
  // Middleware to parse JSON requests
  .use(bodyParser.json())
  // express session initialization
  .use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: true
  }))
  // init passport
  .use(passport.initialize())
  // // allow express to use sessions
  .use(passport.session())
  // Middleware to handle CORS (Cross-Origin Resource Sharing)
  .use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, Z-key'
    );
    res.setHeader(
      'Access-Control-Allow-Methods',
      'POST, GET, PUT, PATCH, OPTIONS, DELETE'
    );
    next();
  })
  .use(cors({methods: ['POST, GET, PUT, PATCH, OPTIONS, DELETE'], origin: '*'}))
  .use('/', require('./routes'));

// Passport GitHub Strategy configuration
passport.use(new GitHubStrategy({
  clientID: process.env.GITHUB_CLIENT_ID || 'your_client_id',
  clientSecret: process.env.GITHUB_CLIENT_SECRET || 'your_client_secret',
  callbackURL: process.env.GITHUB_CALLBACK_URL || 'http://localhost:3000/auth/github/callback'
}, 
(accessToken, refreshToken, profile, done) => {
  // Here you can save the user information to your database
  done(null, profile);
}));

// Serialize user into the sessions
passport.serializeUser((user, done) => {
  done(null, user);
});

// Deserialize user from the sessions
passport.deserializeUser((obj, done) => {
  done(null, obj);
});

app.get('/', (req, res) => {res.send(req.session.user !== undefined ? `Logged in as: ${req.session.user.username}` : 'Logged out');});
app.get('/github/callback', passport.authenticate('github',
  { failureRedirect: '/api-docs',session: false }),
  (req, res) => {
    // Successful authentication, redirect home.
    req.session.user = req.user;
    res.redirect('/');
  });

// Initialize database before starting the server
mongodb.initDb((err) => {
  if (err) {
    console.log('Database connection failed:', err);
  } else {
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}/`);
    });
  }
});
