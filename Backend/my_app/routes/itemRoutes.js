const express = require('express');
const router = express.Router();
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../config/cloudinary');
const itemController = require('../controllers/itemControllers');

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'bill_items',
    allowed_formats: ['jpg', 'jpeg', 'png']
  }
});

const upload = multer({ storage: storage });

// ROUTES
router.get('/items/category/:categoryName', itemController.getItemsByCategory);
router.post('/add-item', upload.single('image'), itemController.addItem);
router.delete('/delete-item/:id', itemController.deleteItem);
router.put('/update-price/:id', itemController.updatePrice);
router.get('/items', itemController.getAllItems);

module.exports = router;