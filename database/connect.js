// Load environment variables from .env file
const dotenv = require('dotenv');
dotenv.config();

// Import MongoDB client
const { MongoClient } = require('mongodb');

// Variable for database connection
let database;

const initDb = (callback) => {
  // If database is already connected, skip reconnecting
  if (database) {
    console.log('Database is already initialized!');
    return callback(null, database);
  }

  // Connect to MongoDB using connection string from .env
  MongoClient.connect(process.env.MONGODB_URI)
    .then((client) => {

      database = client.db('project2');
      console.log('Database connected!');
      callback(null, database);
    })
    .catch((err) => {
      callback(err);
    });
};


const getDatabase = () => {
  if (!database) {
    throw Error('Database not initialized');
  }
  return database;
};

// Export functions
module.exports = {
  initDb,
  getDatabase
};
