const express = require("express");
const router = express.Router();

const {
    adminLogin,
    dashboard,
    getOrders,
    updateOrderStatus,
    deleteOrder,
    getUsers,
    deleteUser
} = require("../controllers/adminController");

const adminAuth = require("../middleware/adminAuth");

// ===============================
// Admin Login
// ===============================
router.post("/login", adminLogin);

// ===============================
// Dashboard
// ===============================
router.get("/dashboard", adminAuth, dashboard);

// ===============================
// Orders
// ===============================
router.get("/orders", adminAuth, getOrders);
router.put("/orders/:id", adminAuth, updateOrderStatus);
router.delete("/orders/:id", adminAuth, deleteOrder);

// ===============================
// Users
// ===============================
router.get("/users", adminAuth, getUsers);
router.delete("/users/:id", adminAuth, deleteUser);

module.exports = router;