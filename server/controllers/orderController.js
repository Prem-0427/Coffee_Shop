const Order = require("../models/Order");

// ========================================
// Get All Orders
// ========================================

exports.getOrders = async (req, res) => {
    try {

        const orders = await Order.find()
            .sort({ createdAt: -1 });

        res.status(200).json(orders);

    } catch (err) {

        console.log(err);

        res.status(500).json({
            success: false,
            message: err.message
        });

    }
};

// ========================================
// Get Single Order
// ========================================

exports.getOrder = async (req, res) => {

    try {

        const order = await Order.findById(req.params.id);

        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order not found"
            });
        }

        res.json(order);

    } catch (err) {

        console.log(err);

        res.status(500).json({
            success: false,
            message: err.message
        });

    }
};

// ========================================
// Create Order
// ========================================

exports.createOrder = async (req, res) => {

    try {

        console.log("Order Request Body:", req.body);

        const order = new Order({

            customerName: req.body.customerName,

            email: req.body.email,

            pickupTime: req.body.pickupTime,

            items: req.body.items,

            totalAmount: req.body.totalAmount,

            status: "Pending",

            paymentStatus: "Pending"

        });

        await order.save();

        res.status(201).json({

            success: true,

            message: "Order placed successfully",

            order

        });

    } catch (err) {

        console.log("Order Save Error:");
        console.log(err);

        res.status(500).json({

            success: false,

            message: err.message

        });

    }
};

// ========================================
// Update Order
// ========================================

exports.updateOrder = async (req, res) => {

    try {

        const order = await Order.findByIdAndUpdate(

            req.params.id,

            req.body,

            {
                new: true,
                runValidators: true
            }

        );

        if (!order) {

            return res.status(404).json({

                success: false,

                message: "Order not found"

            });

        }

        res.json({

            success: true,

            message: "Order updated successfully",

            order

        });

    } catch (err) {

    console.error("========== ORDER ERROR ==========");
    console.error(err);
    console.error(err.stack);

    res.status(500).json({
        success: false,
        message: err.message
    });

}
};

// ========================================
// Delete Order
// ========================================

exports.deleteOrder = async (req, res) => {

    try {

        const order = await Order.findByIdAndDelete(req.params.id);

        if (!order) {

            return res.status(404).json({

                success: false,

                message: "Order not found"

            });

        }

        res.json({

            success: true,

            message: "Order deleted successfully"

        });

    } catch (err) {

        console.log(err);

        res.status(500).json({

            success: false,

            message: err.message

        });

    }
};