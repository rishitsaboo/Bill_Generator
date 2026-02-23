const express  = require('express')
const router = express.Router()


const Bill = require('../models/billModel');


const billController = require('../controllers/billController');

router.post('/generate-bill', billController.generateBill);

