const util = require('util');
const Order = require('../models/OrderModel');

exports.createOrder = async (req, res) => {
    try{
        const { items, totalAmount, customerName,customerPhoneNumber } = req.body;

        if (!customerName || !customerPhoneNumber || !Array.isArray(items) || items.length === 0 || !totalAmount) {
            return res.status(400).json({ error: "Missing required order fields" });
        }

        const newOrder = new Order({
            items,
            totalAmount,
            customerName,
            customerPhoneNumber
        });
        await newOrder.save();

        res.status(201).json(newOrder);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find();
        res.json(orders);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }
        res.json(order);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}
exports.updateOrderStatus = async (req, res) => {
    try {
        const orderId = req.params.id;
        const { status } = req.body;
    
        const updatedOrder = await Order.findByIdAndUpdate(
            orderId,
            { status },
            { returnDocument: "after", runValidators: true } 
        );
        if (!updatedOrder) {
            return res.status(404).json({ message: "Order not found" });
        }
        res.json(updatedOrder);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.deleteOrderById = async (req, res) => {
    try {
        const orderId = req.params.id;
        const deletedOrder = await Order.findByIdAndDelete(orderId);
        if (!deletedOrder) {
            return res.status(404).json({ message: "Order not found" });
        }
        res.json({ message: "Order deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


