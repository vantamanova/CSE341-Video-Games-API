const mongodb = require("../database/connect");
const { ObjectId } = require("mongodb");

// GET all users from the database
const getAll = async (req, res) => {
  try {
    const result = await mongodb
      .getDatabase("")
      .collection("users")
      .find()
      .toArray();

    res.setHeader("Content-Type", "application/json");
    res.status(200).json(result);
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({ message: "Failed to fetch users." });
  }
};

// GET one user
const getSingle = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) { // Validation for ObjectId
    res.status(400).json('Must use a valid user id.');
    return;
  }
  const userId = new ObjectId(req.params.id);
  const result = await mongodb.getDatabase().collection("users").find({ _id: userId });
  result.toArray().then((users) => {
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(users[0]);
  });
};

// CREATE a new user
const create = async (req, res) => {
  // Build a user object from request body
  const user = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    dateOfBirth: req.body.dateOfBirth
  };

  // Insert the user into the database
  const response = await mongodb
    .getDatabase()
    .collection("users")
    .insertOne(user);

  // Return the insertion result
  if (response.acknowledged) {
    res.status(201).json(response);
  } else {
    res.status(500).json({ error: "Failed to create game" });
  }
};

// UPDATE a user
const update = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) { // Validation for ObjectId
    res.status(400).json('Must use a valid user id to update a user.');
    return;
  }
  const userId = new ObjectId(req.params.id);
  const user = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    dateOfBirth: req.body.dateOfBirth
  };
  const response = await mongodb
    .getDatabase()
    .collection("users")
    .replaceOne({ _id: userId }, user);

  if (response.modifiedCount > 0) {
    res.status(200).json({ message: "User updated successfully" });
  } else {
    res.status(500).json(response.error || "Some error occurred while updating the user.");
  }
};

// DELETE a user
const remove = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) { // Validation for ObjectId
    res.status(400).json('Must use a valid user id to delete a user.');
    return;
  }
  const userId = new ObjectId(req.params.id);
  const response = await mongodb.getDatabase().collection("users").deleteOne({ _id: userId });
  if (response.deletedCount > 0) {
    res.status(200).json({ message: "User deleted successfully" });
  } else {
    res.status(500).json(response.error || "Some error occurred while deleting the user.");
  } 
};

module.exports = { getAll, create, getSingle, update, remove };
