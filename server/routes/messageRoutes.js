const express = require("express");
const router = express.Router();

const Contact = require("../models/Contact");
const adminAuth = require("../middleware/adminAuth");

// Get all contact messages
router.get("/", adminAuth, async (req, res) => {
    try {
        const contacts = await Contact.find().sort({ createdAt: -1 });
        res.json(contacts);
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
});

// Delete a contact message
router.delete("/:id", adminAuth, async (req, res) => {
    try {
        await Contact.findByIdAndDelete(req.params.id);

        res.json({
            success: true,
            message: "Message deleted successfully"
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
});

module.exports = router;