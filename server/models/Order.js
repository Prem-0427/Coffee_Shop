const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({

    customerName: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    },

    pickupTime: {
        type: String,
        required: true
    },

    items: [

        {

            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product",
                default: null
            },

            name: String,

            price: Number,

            quantity: Number,

            image: String

        }

    ],

    totalAmount: {

        type: Number,

        required: true

    },

    status: {

        type: String,

        enum: [
            "Pending",
            "Preparing",
            "Delivered"
        ],

        default: "Pending"

    },

    paymentStatus: {

        type: String,

        default: "Pending"

    }

},
{
    timestamps: true
});

module.exports = mongoose.model("Order", orderSchema);