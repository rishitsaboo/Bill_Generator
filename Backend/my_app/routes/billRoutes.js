const express  = require('express')
const router = express.Router()


const Bill = require('../models/billModel');


const billController = require('../controllers/billControllers');

router.post('/bills', billController.generateBill);
router.post('/generate-bill', billController.generateBill);

module.exports = router;
