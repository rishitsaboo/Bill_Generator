const express = require('express');
const router = express.Router();
const { verifyToken, verifyAdmin } = require('../middleware/authMiddleware');

const histryController = require('../controllers/histryController');

router.get('/', verifyToken, verifyAdmin, histryController.getHistoryData);
router.get('/:id', verifyToken, verifyAdmin, histryController.getHistoryBillsById);
router.put('/:id', verifyToken, verifyAdmin, histryController.editHistoryBill);
router.delete('/:id', verifyToken, verifyAdmin, histryController.deleteHistoryBillById);
router.post('/:id/items', verifyToken, verifyAdmin, histryController.addItemInBill);

module.exports = router;