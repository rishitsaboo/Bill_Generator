const express = require('express');
const router = express.Router();

const histryController = require('../controllers/histryController');

router.get('/', histryController.getHistoryData);
router.get('/:id', histryController.getHistoryBillsById);
router.put('/:id', histryController.editHistoryBill);
router.delete('/:id', histryController.deleteHistoryBillById);
router.post('/:id/items', histryController.addItemInBill);

module.exports = router;