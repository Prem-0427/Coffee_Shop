const express = require("express");

const router = express.Router();

const {
    getOrders,
    getOrder,
    createOrder,
    updateOrder,
    deleteOrder
} = require("../controllers/orderController");

console.log({
    getOrders,
    getOrder,
    createOrder,
    updateOrder,
    deleteOrder
});

const adminAuth = require("../middleware/adminAuth");

// ========================================
// Customer Place Order
// POST /api/orders
// ========================================

router.post("/", createOrder);

// ========================================
// Admin Get All Orders
// GET /api/orders
// ========================================

router.get("/", adminAuth, getOrders);

// ========================================
// Admin Get Single Order
// GET /api/orders/:id
// ========================================

router.get("/:id", adminAuth, getOrder);

// ========================================
// Admin Update Order Status
// PUT /api/orders/:id
// ========================================

router.put("/:id", adminAuth, updateOrder);

// ========================================
// Admin Delete Order
// DELETE /api/orders/:id
// ========================================

router.delete("/:id", adminAuth, deleteOrder);

module.exports = router;