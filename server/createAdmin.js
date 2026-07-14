require("dotenv").config();

const mongoose = require("mongoose");

const bcrypt = require("bcryptjs");

const User = require("./models/User");


mongoose.connect(process.env.MONGO_URI);


async function createAdmin() {


    const password =
        await bcrypt.hash(
            "admin123",
            10
        );



    await User.create({

        name: "Admin",

        email: "admin@gmail.com",

        password: password,

        role: "admin"

    });


    console.log("Admin Created");


    process.exit();


}


createAdmin();