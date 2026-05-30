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
router.post('/add-item', (req, res, next) => {
  upload.single('image')(req, res, (err) => {
    if (err) {
      return res.status(400).json({ error: err.message || 'Image upload failed' });
    }
    next();
  });
}, itemController.addItem);
router.delete('/delete-item/:id', itemController.deleteItem);
router.put('/update-price/:id', itemController.updatePrice);
router.get('/items', itemController.getAllItems);

module.exports = router;