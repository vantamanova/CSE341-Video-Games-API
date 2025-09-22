// Import express and create a router
const express = require("express");
const router = express.Router();
const validation = require('../middlewares/validation');

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
    /*  #swagger.parameters['body'] = {
        in: 'body',
        description: 'Add or update a game',
        required: true,
        schema: {
            title: 'Starfield',
            genre: 'Sci-Fi RPG,
            platform: 'PC, Xbox Series X/S',
            releaseDate: '2023-09-06',
            developer: 'Bethesda Game Studios',
            rating: 9,
            priceUSD: 59.99
        }
    }
*/
    validation.saveGame(req, res, () => {
        gamesController.create(req, res);
    });
});

// Update  game by id
router.put("/:id", (req, res) => {
    //#swagger.tags = ["Games Route"]
    /*  #swagger.parameters['body'] = {
        in: 'body',
        description: 'Add or update a game',
        required: true,
        schema: {
            title: 'Horizon Forbidden West',
            genre: 'Action RPG',
            platform: 'PlayStation 4/5',
            releaseDate: '2022-02-18',
            developer: 'Guerrilla Games',
            rating: 9,
            priceUSD: 59.99
        }
    }
*/
    validation.saveGame(req, res, () => {
        gamesController.update(req, res);
    });
});

// Delete a game by id
router.delete("/:id", (req, res) => {
    //#swagger.tags = ["Games Route"]
    gamesController.remove(req, res);
});


// Export
module.exports = router;
