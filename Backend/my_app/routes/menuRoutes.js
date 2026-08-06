const express = require("express");
const router = express.Router();
const menuController = require("../controllers/menuControllers");

// Route to get all items
router.get("/items", menuController.getAllItems);  
router.get("/items/category/:categoryName", menuController.getItemByCategory); // Route to get items by category 
router.get("/items/:id", menuController.getItemById); // Route to get a specific item by ID

module.exports = router;    