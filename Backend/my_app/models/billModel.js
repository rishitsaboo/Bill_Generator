const mongoose = require("mongoose");


const billSchema = new mongoose.Schema({
    customerName:{
        type: String,
        required: true
    },
    date:{
        type: Date,
        default: Date.now,
        index:true
    },
    items:[
        {
            itemId:{
                type: mongoose.Schema.Types.ObjectId,
                ref: 'item'
            },
            name: String,
            category:String,
            price: Number,
            quantity: Number,
            total: Number,
            unit: {
                type: String,
                enum:["plate","piece","per/kg"],
                required: true
            }
        }
    ],
    totalAmount:{
        type:Number,
        required: true
    }
});

module.exports = mongoose.model('Bill',billSchema);