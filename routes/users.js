// Import express and create a router
const express = require("express");
const router = express.Router();

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
    usersController.getSingle(req, res);
});

// Create a new user
router.post("/", (req, res) => {
    /* #swagger.tags = ['Users Route'] */
    usersController.create(req, res);
});

// Update user by id
router.put("/:id", (req, res) => {
    /* #swagger.tags = ['Users Route'] */
    usersController.update(req, res);
}); 

// Delete a user by id
router.delete("/:id", (req, res) => {
    /* #swagger.tags = ['Users Route'] */
    usersController.remove(req, res);
}); 

// Export
module.exports = router;
