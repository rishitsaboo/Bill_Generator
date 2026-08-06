const util = require('util');
const Item = require('../models/ItemModel');


exports.getAllItems = async (req, res) => {
    try{
        const items = await Item.find().sort({ category: 1,name:1 }); // Sort items by name in ascending order
        res.json(items);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
exports.getItemByCategory = async (req, res) => {
    try{
        const categoryName = req.params.categoryName;
        const items = await Item.find({
            category: { $regex: new RegExp(categoryName, 'i') } // Case-insensitive search
        })
        .collation({ locale: "en", strength: 2 }) // Case-insensitive sorting
        .sort({ name: 1 });
        res.json(items);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getItemById = async (req, res) => {
    try{
        const item = await Item.findById(req.params.id);
        if (!item) {
            return res.status(404).json({ message: "Item not found" });
        }
        res.json(item);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

