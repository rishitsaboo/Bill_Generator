const express = require('express');
const router = express.Router();
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../config/cloudinary');
const Item = require('../models/ItemModel')
const itemController = require('../controllers/itemControllers')

const storage = new CloudinaryStorage({
    cloudinary : cloudinary,
    params: {
        folder: 'bill_itmes',
        allowed_formats: ['jpg','jpeg', 'png']
    }
});

const upload = multer({ storage: storage });

// item schema
router.get('/items/category/:categoryName', itemController.getItemsByCategory);
router.post('/add-item',upload.single('image'),itemController.addItem);
router.delete('/delete-item/:id', itemController.deleteItem);
router.put('/update-price/:id', itemController.updatePrice);



module.exports = router;