const express = require('express');
const router = express.Router();
const { verifyToken, verifyAdmin } = require('../middleware/authMiddleware');

const historyController = require('../controllers/historyController');

router.get('/', verifyToken, verifyAdmin, historyController.getHistoryData);
router.get('/:id', verifyToken, verifyAdmin, historyController.getHistoryBillsById);
router.put('/:id', verifyToken, verifyAdmin, historyController.editHistoryBill);
router.delete('/:id', verifyToken, verifyAdmin, historyController.deleteHistoryBillById);
router.post('/:id/items', verifyToken, verifyAdmin, historyController.addItemInBill);

module.exports = router;