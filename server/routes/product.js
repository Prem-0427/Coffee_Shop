const express = require("express");
const router = express.Router();

const {
    getProducts,
    getProduct,
    addProduct,
    updateProduct,
    deleteProduct
} = require("../controllers/productController");

const adminAuth = require("../middleware/adminAuth");

// ==========================
// Public Routes
// ==========================
router.get("/", getProducts);
router.get("/:id", getProduct);

// ==========================
// Admin Routes
// ==========================
router.post("/", adminAuth, addProduct);
router.put("/:id", adminAuth, updateProduct);
router.delete("/:id", adminAuth, deleteProduct);

module.exports = router;