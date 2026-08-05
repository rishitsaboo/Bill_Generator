// Use the Item model consistently
const util = require('util');
const Item = require('../models/ItemModel');

exports.deleteItem = async (req, res) => {
    try {
        const id = req.params.id;

        const deletedItem = await Item.findByIdAndDelete(id);

        if (!deletedItem) {
            return res.status(404).json({ message: "Item not found" });
        }

        res.json({ message: "Item deleted successfully" });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.updateItem = async (req,res) => {

    try{
        const itemId = req.params.id;
        const { name, price, unit } = req.body

        const updatedData = {};
        if (name !== undefined) updatedData.name = name;
        if (price !== undefined) updatedData.price = price;
        if (unit !== undefined) updatedData.unit = unit;
        const updatedItem = await Item.findByIdAndUpdate(
            itemId,
            updatedData,
            { returnDocument: "after", runValidators: true } 
        );
        if (!updatedItem) {
            return res.status(404).json({ message: "Item not found" });
        }
        res.json(updatedItem)
    }
    catch(err){
        res.status(500).json({ error: err.message });
    }
};

exports.addItem = async (req,res) => {
    try{
        const file = req.file;

        const getStringValue = (value) => typeof value === 'string' && value.trim() ? value.trim() : '';

        let imageUrl = '';
        if (file) {
            imageUrl = getStringValue(file.path) || getStringValue(file.secure_url) || getStringValue(file.url) || getStringValue(file.filename);
        }

        if (!imageUrl) {
            return res.status(400).json({
                error: 'Image upload failed or missing file',
                file: file || null,
                body: req.body
            });
        }

        const newItem = new Item({
            name: req.body.name,
            category: req.body.category,
            price: req.body.price,
            image: imageUrl,
            unit: req.body.unit
        });
        await newItem.save();
        res.json(newItem);
    } catch (err) {
        console.error("addItem error:", util.inspect(err, { depth: 5 }));
        console.error("file:", util.inspect(req.file, { depth: 5 }));
        console.error("body:", util.inspect(req.body, { depth: 5 }));
        res.status(500).json({ error: err.message || err, file: req.file || null });
    }
};

exports.getItemsByCategory = async (req,res) => {
    try{
        const categoryName = req.params.categoryName;
        const items = await Item.find({
            category: {
                $regex: new RegExp(categoryName, 'i')
            }
        })
        .collation({ locale: "en", strength: 2 }) // case-insensitive sorting
        .sort({ name: 1 }); // A → Z
        res.json(items);
    }
    catch(err){
        res.status(500).json({ error: err.message });
    } 
};
exports.getAllItems = async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
