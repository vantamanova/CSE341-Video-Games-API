// Import dependencies
const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('./database/connect');
const app = express();

// Port
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON requests
app.use(bodyParser.json());

// Middleware to handle CORS (Cross-Origin Resource Sharing)
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Z-key'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, OPTIONS'
  );
  next();
});

// Routes
app.use('/', require('./routes'));

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
