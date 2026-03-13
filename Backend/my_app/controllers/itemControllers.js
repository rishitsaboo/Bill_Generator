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
        const newItem = new Item({
            name: req.body.name,
            category: req.body.category,
            price: req.body.price,
            image: req.file.path
        });
        await newItem.save()
        res.json(newItem);    
    }catch (err){
        res.status(500).send(err);
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
