const express  = require('express')
const router = express.Router()

const { verifyToken, verifyAdmin } = require('../middleware/authMiddleware');
const Bill = require('../models/billModel');
const billController = require('../controllers/billControllers');

router.post('/bills', verifyToken, verifyAdmin, billController.generateBill);
router.post('/generate-bill', verifyToken, verifyAdmin, billController.generateBill);

module.exports = router;
