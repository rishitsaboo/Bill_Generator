const express = require('express')
const router = express.Router();
const statsContoller = require('../controllers/statsController');


router.get('/dashboard',statsContoller.getDashboardData);
// router.get('/monthly-sales',statsContoller.getMonthlySales);
// router.get('/daily-sales',statsContoller.getDailySales);
// router.get('/get-Monthly-Sales-By-Categories',statsContoller.getMonthlySalesByCategories);
// router.get('/get-Top-Seller-For-current-Month',statsContoller.topSellerForCurrentMonth);



module.exports = router;