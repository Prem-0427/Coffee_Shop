// ======================================
// Coffee Shop Backend Server
// ======================================

const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");


// Load Environment Variables
dotenv.config();


// Create Express App
const app = express();



// ======================================
// CORS CONFIGURATION
// ======================================

app.use(cors({

    origin: [
        "http://localhost:5500",
        "http://127.0.0.1:5500",
        "https://coffee-co-coffee.netlify.app"
    ],

    credentials: true,

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
    ]

}));



// Handle OPTIONS Request
app.options("*", cors());



// ======================================
// MIDDLEWARES
// ======================================

app.use(express.json());

app.use(express.urlencoded({
    extended:true
}));

app.use(cookieParser());



// ======================================
// DATABASE CONNECTION
// ======================================

mongoose.connect(process.env.MONGO_URI)
.then(()=>{

    console.log("MongoDB Connected Successfully");

})
.catch((error)=>{

    console.log("MongoDB Connection Error");
    console.log(error.message);

});




// ======================================
// CORS TEST ROUTE
// ======================================

app.get("/cors-test",(req,res)=>{

    res.json({

        success:true,
        origin:req.headers.origin,
        message:"CORS Working Successfully"

    });

});




// ======================================
// DEFAULT ROUTE
// ======================================

app.get("/",(req,res)=>{

    res.json({

        success:true,
        message:"Coffee Shop Backend Running"

    });

});




// ======================================
// API ROUTES
// ======================================

app.use(
    "/api/auth",
    require("./routes/auth")
);


// Add other routes later
// app.use("/api/products", require("./routes/products"));
// app.use("/api/orders", require("./routes/orders"));
// app.use("/api/messages", require("./routes/messages"));





// ======================================
// 404 ROUTE
// ======================================

app.use((req,res)=>{

    res.status(404).json({

        success:false,
        message:"Route Not Found"

    });

});




// ======================================
// ERROR HANDLER
// ======================================

app.use((err,req,res,next)=>{


    console.log(err);


    res.status(500).json({

        success:false,
        message:"Internal Server Error"

    });


});




// ======================================
// START SERVER
// ======================================

const PORT = process.env.PORT || 5000;


app.listen(PORT,()=>{

    console.log(
        `Server running on port ${PORT}`
    );

});
