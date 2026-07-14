const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");

dotenv.config();

// ======================
// Database Connection
// ======================

const connectDB = require("./config/db");
connectDB();

const app = express();

// ======================
// CORS
// ======================

const allowedOrigins = [
    "http://localhost:5500",
    "http://127.0.0.1:5500",
    "https://coffee-co-coffee.netlify.app"
];

app.use(cors({
    origin: allowedOrigins,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

// ======================
// Body Parser
// ======================

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ======================
// Cookie Parser
// ======================

app.use(cookieParser());

// ======================
// Debug Middleware
// ======================

app.use((req, res, next) => {

    console.log("================================");
    console.log(req.method, req.url);
    console.log("Origin:", req.headers.origin);
    console.log("BODY:", req.body);
    console.log("================================");

    next();

});

// ======================
// Routes
// ======================

app.use("/api/auth", require("./routes/auth"));
app.use("/api/products", require("./routes/product"));
app.use("/api/cart", require("./routes/cart"));
app.use("/api/orders", require("./routes/order"));
app.use("/api/contact", require("./routes/contact"));
app.use("/api/messages", require("./routes/messageRoutes"));
app.use("/api/admin", require("./routes/admin"));

// ======================
// Test Route
// ======================

app.get("/test-cors", (req, res) => {

    res.json({

        success: true,
        message: "CORS Working",
        origin: req.headers.origin || "No Origin"

    });

});

// ======================
// Home Route
// ======================

app.get("/", (req, res) => {

    res.json({

        success: true,
        message: "Coffee Shop Backend Running"

    });

});

// ======================
// 404
// ======================

app.use((req, res) => {

    res.status(404).json({

        success: false,
        message: "Route Not Found"

    });

});

// ======================
// MongoDB Connected
// ======================

mongoose.connection.once("open", () => {

    console.log("✅ MongoDB Connected");

});

// ======================
// Start Server
// ======================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {

    console.log(`🚀 Server running at http://localhost:${PORT}`);

});