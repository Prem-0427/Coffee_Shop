const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");

dotenv.config();

const app = express();


// ===============================
// CORS FIX
// ===============================

const allowedOrigins = [
    "http://localhost:5500",
    "http://127.0.0.1:5500",
    "https://coffee-co-coffee.netlify.app"
];


app.use(cors({

    origin: function(origin, callback){

        // Allow requests without origin (Postman, mobile apps)
        if(!origin){
            return callback(null,true);
        }


        if(allowedOrigins.includes(origin)){
            return callback(null,true);
        }


        return callback(new Error("Not allowed by CORS"));

    },

    credentials:true,

    methods:[
        "GET",
        "POST",
        "PUT",
        "DELETE",
        "OPTIONS"
    ],

    allowedHeaders:[
        "Content-Type",
        "Authorization"
    ]

}));


// Express 5 preflight
app.options("/{*any}", cors());


// ===============================
// Middleware
// ===============================

app.use(express.json());

app.use(express.urlencoded({
    extended:true
}));

app.use(cookieParser());



// ===============================
// MongoDB
// ===============================

mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    console.log("MongoDB Connected");
})
.catch((err)=>{
    console.log(err.message);
});


app.get("/cors-test",(req,res)=>{

    res.json({
        origin:req.headers.origin,
        message:"CORS test working"
    });

});
// ===============================
// Routes
// ===============================

const authRoutes = require("./routes/auth");

app.use("/api/auth", authRoutes);



// Other routes if available
// app.use("/api/products", require("./routes/products"));
// app.use("/api/orders", require("./routes/orders"));
// app.use("/api/messages", require("./routes/messages"));



// ===============================
// Test Route
// ===============================

app.get("/",(req,res)=>{

    res.json({
        success:true,
        message:"Coffee Shop Backend Running"
    });

});



// ===============================
// Error Handler
// ===============================

app.use((err,req,res,next)=>{

    console.log(err);

    res.status(500).json({

        success:false,
        message:err.message

    });

});



// ===============================
// Server
// ===============================

const PORT = process.env.PORT || 5000;


app.listen(PORT,()=>{

    console.log(
        `Server running on port ${PORT}`
    );

});