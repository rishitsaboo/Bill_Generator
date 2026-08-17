const mongoose = require("mongoose");

const billSchema = new mongoose.Schema({
    customerName: {
        type: String,
        required: true
    },

    customerPhoneNumber: {
        type: String,
        required: true
    },

    items: [
        {
            itemId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Item"
            },

            name: String,

            category: String,

            price: Number,

            quantity: Number,

            total: Number,

            unit: {
                type: String,
                enum: ["plate", "piece", "per/kg"],
                required: true
            },

            weightInGrams: {
                type: Number,
                default: null
            }
        }
    ],

    totalAmount: {
        type: Number,
        required: true
    },

    createdAt: {
        type: Date,
        default: Date.now
    },

    status: {
        type: String,
        enum: [
            "Pending",
            "Accepted",
            "Preparing",
            "Ready",
            "Completed",
            "Cancelled"
        ],
        default: "Pending"
    },

    deliveryTime: {
        type: Date,
        default: null
    }
});

module.exports = mongoose.model("Bill", billSchema);