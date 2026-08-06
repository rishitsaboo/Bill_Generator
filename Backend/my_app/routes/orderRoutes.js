const express = require('express'); 
const router = express.Router();
const orderController = require('../controllers/orderControllers');
const { verifyToken, verifyAdmin } = require('../middleware/authMiddleware');

router.post('/',  orderController.createOrder);
router.get('/', verifyToken, verifyAdmin, orderController.getAllOrders);
router.get('/:id', verifyToken, verifyAdmin, orderController.getOrderById);
router.put('/:id/status', verifyToken, verifyAdmin, orderController.updateOrderStatus);
router.delete('/:id', verifyToken, verifyAdmin, orderController.deleteOrderById);

module.exports = router;    

