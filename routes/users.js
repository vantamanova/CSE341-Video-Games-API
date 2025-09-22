// Import express and create a router
const express = require("express");
const router = express.Router();
const validation = require('../middlewares/validation');

// handles the route logic
const usersController = require("../controllers/users");

// Return all users
router.get("/", (req, res) => {
  /* #swagger.tags = ['Users Route'] */
  usersController.getAll(req, res);
});

// Return one user
router.get("/:id", (req, res) => {
    /* #swagger.tags = ['Users Route'] */
    /*  #swagger.parameters['id'] = {
        in: 'path',
        description: 'User ID',
        required: true,
        type: 'string'
    }
*/
    usersController.getSingle(req, res);
});

// Create a new user
router.post("/", (req, res) => {
    /* #swagger.tags = ['Users Route'] */
    /*  #swagger.parameters['body'] = {
        in: 'body',
        description: 'Add a new user',
        required: true,
        schema: {
            username: 'xsdilm',
            email: 'xsdil@mgmail.com',
            dateOfBirth: '2000-01-15',
            favoriteGenre: 'RPG',
            platformPreference: 'PlayStation',
            hoursPlayedPerWeek: 20,
            ownedGames: ['68baa22497af4b860190a776'],
            isPremiumMember: true,
            createdAt: '2025-09-18'
        }
    }
*/
    validation.saveUser(req, res, () => {
            usersController.create(req, res);
        });
});

// Update user by id
router.put("/:id", (req, res) => {
    /* #swagger.tags = ['Users Route'] */
    /*  #swagger.parameters['body'] = {
        in: 'body',
        description: 'Add a new user',
        required: true,
        schema: {
            username: 'zxsdilm',
            email: 'zxsdil@mgmail.com',
            dateOfBirth: '2000-01-15',
            favoriteGenre: 'RPG',
            platformPreference: 'PlayStation',
            hoursPlayedPerWeek: 20,
            ownedGames: ['68baa22497af4b860190a776'],
            isPremiumMember: true,
            createdAt: '2025-09-18'
        }
    }
*/
    validation.saveUser(req, res, () => {
            usersController.update(req, res);
        });
}); 

// Delete a user by id
router.delete("/:id", (req, res) => {
    /* #swagger.tags = ['Users Route'] */
    /*  #swagger.parameters['id'] = {
        in: 'path',
        description: 'User ID',
        required: true,
        type: 'string'
    }
*/
    usersController.remove(req, res);
}); 

// Export
module.exports = router;
