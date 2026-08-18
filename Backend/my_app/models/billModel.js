const mongoose = require("mongoose");

const billSchema = new mongoose.Schema({
    customerName: {
        type: String,
        required: true
    },

    customerPhoneNumber: {
        type: String,
        default: "",
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

    date: {
        type: Date,
        default: Date.now
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