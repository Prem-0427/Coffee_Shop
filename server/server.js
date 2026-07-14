const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");

dotenv.config();

// Database
const connectDB = require("./config/db");
connectDB();

const app = express();

// =====================
// Middlewares
// =====================

const allowedOrigins = [
    "http://127.0.0.1:5500",
    "http://localhost:5500",
    "https://coffee-co-coffee.netlify.app"
];

app.use(cors({
    origin: function (origin, callback) {

        // Allow requests with no origin (Postman, mobile apps, etc.)
        if (!origin) return callback(null, true);

        if (allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// VERY IMPORTANT
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

// Debug middleware
app.use((req, res, next) => {
    console.log("================================");
    console.log(req.method, req.url);
    console.log("BODY:", req.body);
    console.log("================================");
    next();
});

// =====================
// Routes
// =====================

app.use("/api/auth", require("./routes/auth"));
app.use("/api/products", require("./routes/product"));
app.use("/api/cart", require("./routes/cart"));
app.use("/api/orders", require("./routes/order"));
app.use("/api/contact", require("./routes/contact"));
app.use("/api/messages", require("./routes/messageRoutes"));
app.use("/api/admin", require("./routes/admin"));

// Home
app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Coffee Shop Backend Running"
    });
});

// 404
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Route Not Found"
    });
});

mongoose.connection.once("open", () => {
    console.log("✅ MongoDB Connected");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
});