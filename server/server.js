// ===============================
// Coffee Shop Backend Server
// ===============================

const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");


// Load Environment Variables
dotenv.config();


// Initialize Express
const app = express();


// ===============================
// CORS Configuration
// ===============================

app.use(cors({

    origin: [
        "http://localhost:5500",
        "http://127.0.0.1:5500",
        "https://coffee-co-coffee.netlify.app"
    ],

    methods: [
        "GET",
        "POST",
        "PUT",
        "DELETE",
        "OPTIONS"
    ],

    allowedHeaders: [
        "Content-Type",
        "Authorization"
    ],

    credentials: true

}));


// Handle Preflight Requests (Express 5)
app.options("/{*splat}", cors());



// ===============================
// Middlewares
// ===============================

app.use(express.json());

app.use(express.urlencoded({
    extended:true
}));

app.use(cookieParser());



// ===============================
// Database Connection
// ===============================

const connectDB = async()=>{

    try{

        await mongoose.connect(process.env.MONGO_URI);

        console.log("MongoDB Connected Successfully");

    }
    catch(error){

        console.log("MongoDB Connection Failed");
        console.log(error.message);

        process.exit(1);

    }

};


connectDB();



// ===============================
// Routes
// ===============================

const authRoutes = require("./routes/auth");

app.use("/api/auth", authRoutes);


// Products
const productRoutes = require("./routes/products");

app.use("/api/products", productRoutes);


// Orders
const orderRoutes = require("./routes/orders");

app.use("/api/orders", orderRoutes);


// Users
const userRoutes = require("./routes/users");

app.use("/api/users", userRoutes);


// Messages
const messageRoutes = require("./routes/messages");

app.use("/api/messages", messageRoutes);



// ===============================
// Default Route
// ===============================

app.get("/",(req,res)=>{

    res.json({

        success:true,
        message:"Coffee Shop API Running Successfully"

    });

});



// ===============================
// Error Handler
// ===============================

app.use((err,req,res,next)=>{

    console.log(err.stack);


    res.status(500).json({

        success:false,
        message:"Internal Server Error"

    });


});



// ===============================
// Start Server
// ===============================

const PORT = process.env.PORT || 5000;


app.listen(PORT,()=>{

    console.log(`Server running on port ${PORT}`);

});