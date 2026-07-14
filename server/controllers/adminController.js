const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/User");

// Admin Login

exports.adminLogin = async (req, res) => {

    try {

        const { email, password } = req.body;

        const admin = await User.findOne({
            email,
            role: "admin"
        });

        if (!admin) {

            return res.status(401).json({
                success: false,
                message: "Admin not found."
            });

        }

        const match = await bcrypt.compare(password, admin.password);

        if (!match) {

            return res.status(401).json({
                success: false,
                message: "Invalid Password"
            });

        }

        const token = jwt.sign(

            {
                id: admin._id,
                role: admin.role
            },

            process.env.JWT_SECRET,

            {
                expiresIn: "1d"
            }

        );

        res.json({

            success: true,

            token,

            admin: {
                _id: admin._id,
                name: admin.name,
                email: admin.email,
                role: admin.role
            }

        });

    }

    catch (err) {

        res.status(500).json({

            success: false,

            message: err.message

        });

    }

};
const Product = require("../models/Product");
const Order = require("../models/Order");
const Contact = require("../models/Contact");

exports.dashboard = async (req, res) => {

    try {

        const users = await User.countDocuments();

        const products = await Product.countDocuments();

        const orders = await Order.countDocuments();

        const messages = await Contact.countDocuments();

        const recentOrders = await Order.find()

            .sort({ createdAt: -1 })

            .limit(5);

        res.json({

            users,

            products,

            orders,

            messages,

            recentOrders

        });

    }

    catch (err) {

        res.status(500).json({

            message: err.message

        });

    }

};
// View Users

exports.getUsers=async(req,res)=>{

try{

const users=await User.find()

.select("-password")

.sort({

createdAt:-1

});

res.json(users);

}

catch(err){

res.status(500).json({

message:err.message

});

}

};

// Delete User

exports.deleteUser=async(req,res)=>{

try{

await User.findByIdAndDelete(req.params.id);

res.json({

success:true,

message:"User Deleted"

});

}

catch(err){

res.status(500).json({

message:err.message

});

}

};



// ===============================
// GET ALL ORDERS
// ===============================

exports.getOrders = async(req,res)=>{

    try{


        const orders = await Order.find()

        .populate(
            "user",
            "name email"
        )

        .sort({
            createdAt:-1
        });



        res.json(orders);


    }
    catch(err){


        res.status(500).json({

            message:err.message

        });


    }

};



// ===============================
// UPDATE ORDER STATUS
// ===============================

exports.updateOrderStatus = async(req,res)=>{


    try{


        const order = await Order.findByIdAndUpdate(

            req.params.id,

            {

                status:req.body.status

            },

            {
                new:true
            }

        );


        if(!order){

            return res.status(404).json({

                message:"Order not found"

            });

        }


        res.json({

            success:true,

            order

        });



    }
    catch(err){


        res.status(500).json({

            message:err.message

        });


    }


};



// ===============================
// DELETE ORDER
// ===============================

exports.deleteOrder = async(req,res)=>{


    try{


        const order = await Order.findByIdAndDelete(

            req.params.id

        );


        if(!order){


            return res.status(404).json({

                message:"Order not found"

            });


        }


        res.json({

            success:true,

            message:"Order deleted"

        });



    }
    catch(err){


        res.status(500).json({

            message:err.message

        });


    }


};