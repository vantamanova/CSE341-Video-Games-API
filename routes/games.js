// Import express and create a router
const express = require("express");
const router = express.Router();

// handles logic for each route)
const gamesController = require("../controllers/games");

// Return all games
router.get("/", (req, res) => {
    //#swagger.tags = ["Games Route"]
    gamesController.getAll(req, res);
});

// Return one game
router.get("/:id", (req, res) => {
    //#swagger.tags = ["Games Route"]
    gamesController.getSingle(req, res);
});

// Create a new game
router.post("/", (req, res) => {
    //#swagger.tags = ["Games Route"]
    gamesController.create(req, res);
});

// Update  game by id
router.put("/:id", (req, res) => {
    //#swagger.tags = ["Games Route"]
    gamesController.update(req, res);
});

// Delete a game by id
router.delete("/:id", (req, res) => {
    //#swagger.tags = ["Games Route"]
    gamesController.remove(req, res);
});


// Export
module.exports = router;
