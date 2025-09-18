const mongodb = require("../database/connect");
const { ObjectId } = require("mongodb");

// GET all games from the database
const getAll = async (req, res) => {
  const result = await mongodb
    .getDatabase()        
    .collection("games")  
    .find();

  // Convert result to array and send as JSON
  result.toArray().then((games) => {
    res.status(200).json(games);
  });
};

// GET one game
const getSingle = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) { // Validation for ObjectId
    res.status(400).json('Must use a valid game id.');
    return;
  }
  const gameId = new ObjectId(req.params.id);
  const result = await mongodb.getDatabase().collection("games").find({ _id: gameId });
  result.toArray().then((games) => {
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(games[0]); 
  });
};

// CREATE a new game
const create = async (req, res) => {
  // Build a game object from request body
  const game = {
    title: req.body.title,
    genre: req.body.genre,
    platform: req.body.platform,
    releaseDate: req.body.releaseDate,
    developer: req.body.developer,
    rating: req.body.rating,
    priceUSD: req.body.priceUSD,
  };

  // Insert the game into the database
  const response = await mongodb
    .getDatabase()       
    .collection("games")
    .insertOne(game);

  // Return the insertion result
  if (response.acknowledged) {
    res.status(201).json(response);
  } else {
    res.status(500).json({ error: "Failed to create game" });
  }
};

// UPDATE a game
const update = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) { // Validation for ObjectId
    res.status(400).json('Must use a valid game id to update a game.');
    return;
  }
  const gameId = new ObjectId(req.params.id);
  const game = {
    title: req.body.title,
    genre: req.body.genre,
    platform: req.body.platform,
    releaseDate: req.body.releaseDate,
    developer: req.body.developer,
    rating: req.body.rating,
    priceUSD: req.body.priceUSD,
  };
  const response = await mongodb
    .getDatabase()
    .collection("games")
    .updateOne({ _id: gameId }, { $set: game });

  if (response.modifiedCount > 0) {
    res.status(200).json({ message: "Game updated successfully" });
  } else {
    res.status(500).json(response.error || "Some error occurred while updating the game.");
  }
};

// DELETE a game
const remove = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) { // Validation for ObjectId
    res.status(400).json('Must use a valid game id to delete a game.');
    return;
  }
  const gameId = new ObjectId(req.params.id); 
  const response = await mongodb.getDatabase().collection("games").deleteOne({ _id: gameId });
  if (response.deletedCount > 0) {
    res.status(200).json({ message: "Game deleted successfully" });
  } else {
    res.status(500).json(response.error || "Some error occurred while deleting the game.");
  }
};

module.exports = { getAll, getSingle, create, update, remove };