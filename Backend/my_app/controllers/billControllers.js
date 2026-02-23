const Bill = require('../models/billModel.js')

exports.generateBill = async (req,res) => {
    try{
        const { customerName,items } = req.body;
        let totalAmount = 0;
        
        items.forEach(item => {
            totalAmount += item.total;
        });
        const newBill = new Bill({
            customerName,
            items,
            totalAmount
        });
        await newBill.save()
        res.json()
    }
    catch (err){
        res.status(500).json({
            error:err.message
        });
    }
}; 