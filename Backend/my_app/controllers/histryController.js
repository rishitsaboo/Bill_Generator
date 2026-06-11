const Bill = require('../models/billModel')

exports.getHistoryData = async (req, res) => {
    try{
        const bills = await Bill.find()
        .select("customerName date totalAmount items")
        .sort({ date: -1 });
        const formattedBills = bills.map((bill) => ({
            _id: bill._id,
            customerName: bill.customerName,
            date: bill.date,
            totalAmount: bill.totalAmount,
            items: bill.items
        }));
        res.json({
            success: true,
            count: formattedBills.length,
            data: formattedBills
        });
    }catch(error){
        res.status(500).json({ 
            success: false,
            message: error.message 
        });
    }
};


exports.getHistoryBillsById = async (req, res) => {
    try {
        const billId = req.params.id;
        const bill = await Bill.findById(billId);
        if (!bill) {
            return res.status(404).json({ 
                success: false,
                message: "Bill not found" 
            }); 
        }
        res.json({
            success: true,
            data: bill
        });
    }
    catch (error) {
        res.status(500).json({ 
            success: false,
            message: error.message 
        });
    }
}

exports.deleteHistoryBillById = async (req, res) => {
    try {
        const billId = req.params.id;
        const deletedBill = await Bill.findByIdAndDelete(billId);
        if (!deletedBill) {
            return res.status(404).json({ 
                success: false,
                message: "Bill not found" 
            }); 
        }
        res.json({
            success: true,
            message: "Bill deleted successfully",
            data: deletedBill
        });
    }
    catch (error) {
        res.status(500).json({ 
            success: false,
            message: error.message 
        });
    }
}

exports.editHistoryBill = async (req, res) => {
    try {
        const billId = req.params.id;
        const updates = req.body;

        const updatedBill = await Bill.findByIdAndUpdate(
            billId, 
            updates, 
            { new: true, runValidators: true }
        );

        if (!updatedBill) {
            return res.status(404).json({ 
                success: false,
                message: "Bill not found" 
            }); 
        }

        res.json({
            success: true,
            message: "Bill updated successfully",
            data: updatedBill
        });
    } catch (error) {
        res.status(500).json({ 
            success: false,
            message: error.message 
        });
    }
}

exports.addItemInBill = async (req, res) => {
    try {
        const billId = req.params.id;
        const { name, quantity, price } = req.body;

        const bill = await Bill.findById(billId);
        if (!bill) {
            return res.status(404).json({ 
                success: false,
                message: "Bill not found" 
            }); 
        }

        const quantityNumber = Number(quantity) || 0;
        const priceNumber = Number(price) || 0;
        const itemTotal = quantityNumber * priceNumber;

        const newItem = {
            name,
            quantity: quantityNumber,
            price: priceNumber,
            total: itemTotal
        };

        bill.items.push(newItem);
        bill.totalAmount = (bill.totalAmount || 0) + itemTotal;
        await bill.save();

        res.json({
            success: true,
            message: "Item added to bill successfully",
            data: bill
        });
    } catch (err) {
        res.status(500).json({ 
            success: false,
            message: err.message
        });
    }
};










    
