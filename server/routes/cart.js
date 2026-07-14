const express = require("express");

const router = express.Router();

// Get Cart
router.get("/", (req, res) => {

    res.json({
        success: true,
        message: "Cart Route Working"
    });

});

module.exports = router;