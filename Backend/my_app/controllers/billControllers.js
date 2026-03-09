const Bill = require('../models/billModel.js')

exports.generateBill = async (req,res) => {
    try{
        const { customerName, items = [] } = req.body;
        let totalAmount = 0;

        const normalizedItems = items.map((item) => {
            const price = Number(item.price) || 0;
            const quantity = Number(item.quantity) || 0;
            const total = price * quantity;

            totalAmount += total;

            return {
                ...item,
                price,
                quantity,
                total
            };
        });

        const newBill = new Bill({
            customerName,
            items: normalizedItems,
            totalAmount
        });
        await newBill.save()
        res.status(201).json({
            message:"Bill generated successfully",
            bill:newBill
        })
    }
    catch (err){
        res.status(500).json({
            error:err.message
        });
    }
}; 
