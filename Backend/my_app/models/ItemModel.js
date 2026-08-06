const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    category:{
        type: String,
        enum:["Namkeens", "Sweets", "Nasta_Items", "Sabzi", "Others"],
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    image:{
        type: String,
        required: false
    },
    unit:{
        type: String,
        enum:["plate","piece","per/kg"],
        required: true
    },
    ingredients: {
        type: [String],
        required: false
    },
    isAvailable: {
        type: Boolean,
        default: true
    },
    description: {
        type: String,
        required: false
    }
});
// Create Model


module.exports =  mongoose.model('Item', itemSchema);
