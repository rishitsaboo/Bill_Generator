// Use the Item model consistently
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

exports.updatePrice = async (req,res) => {

    try{
        const itemId = req.params.id;
        const { price } = req.body

        const updatedItem = await Item.findByIdAndUpdate(
            itemId,
            { price: price },
            { new: true } 
        );
        res.json(updatedItem)
    }
    catch(err){
        res.status(500).json({ error: err.message });
    }
};

exports.addItem = async (req,res) => {
    try{
        const file = req.file;

        let imageUrl = "";
        if (file) {
            imageUrl = file.path || file.secure_url || file.url || file.filename || "";
        }

        // fallback to body fields if frontend sent a URL instead of a file
        if (!imageUrl) {
            imageUrl = req.body.imageUrl || req.body.image || "";
        }

        const newItem = new Item({
            name: req.body.name,
            category: req.body.category,
            price: req.body.price,
            image: imageUrl
        });
        await newItem.save();
        res.json(newItem);
    } catch (err) {
        console.error("addItem error:", err, "file:", req.file);
        res.status(500).json({ error: err.message, file: req.file || null });
    }
};

exports.getItemsByCategory = async (req,res) => {
    try{
        const categoryName = req.params.categoryName;
        const items = await Item.find({
            category: {
                $regex: new RegExp(categoryName, 'i')
            }
        });
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
