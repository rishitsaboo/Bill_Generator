const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    category:{
        type: String,
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
});
// Create Model


module.exports =  mongoose.model('Item', itemSchema);
