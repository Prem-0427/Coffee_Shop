require("dotenv").config();
const mongoose = require("mongoose");

const Product = require("./models/Product");

mongoose.connect(process.env.MONGO_URI)
.then(async () => {

    console.log("MongoDB Connected");

    // Remove old products
    await Product.deleteMany();

    const products = [

        {
            name: "Espresso",
            category: "Hot Coffee",
            price: 149,
            image: "client/images/espresso.png",
            description: "A tight, syrupy double shot. Where everything else on the menu starts.",
            available: true
        },

        {
            name: "Americano",
            category: "Hot Coffee",
            price: 139,
            image: "client/images/americano.jpeg",
            description: "Espresso cut with hot water for a lighter body, full flavor.",
            available: true
        },

        {
            name: "Cappuccino",
            category: "Hot Coffee",
            price: 179,
            image: "client/images/cappuccino.png",
            description: "Equal parts espresso, steamed milk, and microfoam.",
            available: true
        },

        {
            name: "Latte",
            category: "Hot Coffee",
            price: 199,
            image: "client/images/latte.png",
            description: "Espresso, steamed milk, a thin cap of foam.",
            available: true
        },

        {
            name: "Mocha",
            category: "Hot Coffee",
            price: 229,
            image: "client/images/mocha.png",
            description: "Espresso and steamed milk with house-made dark chocolate.",
            available: true
        },

        {
            name: "Flat White",
            category: "Hot Coffee",
            price: 189,
            image: "client/images/flatwhite.png",
            description: "Ristretto shots under velvety micro-foam.",
            available: true
        },

        {
            name: "Cold Brew",
            category: "Cold Coffee",
            price: 209,
            image: "client/images/coldbrew.png",
            description: "Steeped 18 hours, low acid, naturally sweet.",
            available: true
        },

        {
            name: "Iced Latte",
            category: "Cold Coffee",
            price: 199,
            image: "client/images/icedlatte.png",
            description: "Espresso over cold milk and ice.",
            available: true
        },

        {
            name: "Iced Americano",
            category: "Cold Coffee",
            price: 299,
            image: "client/images/icedamericano.png",
            description: "Espresso and cold water over ice.",
            available: true
        },

        {
            name: "Frappe",
            category: "Cold Coffee",
            price: 129,
            image: "client/images/frappe.png",
            description: "Blended cold with ice.",
            available: true
        },

        {
            name: "Iced Mocha",
            category: "Cold Coffee",
            price: 149,
            image: "client/images/icedmocha.png",
            description: "Chocolate, espresso, cold milk, ice.",
            available: true
        },

        {
            name: "Affogato",
            category: "Dessert",
            price: 249,
            image: "client/images/affogato.jpeg",
            description: "Espresso poured over vanilla gelato.",
            available: true
        },

        {
            name: "Tiramisu",
            category: "Dessert",
            price: 279,
            image: "client/images/tiramisu.png",
            description: "Espresso-soaked ladyfingers.",
            available: true
        },

        {
            name: "Chocolate Croissant",
            category: "Dessert",
            price: 159,
            image: "client/images/croissant.png",
            description: "Fresh baked chocolate croissant.",
            available: true
        },

        {
            name: "Banana Bread",
            category: "Dessert",
            price: 149,
            image: "client/images/bananabread.png",
            description: "Dense, moist banana bread.",
            available: true
        }

    ];

    await Product.insertMany(products);

    console.log("15 Products Inserted Successfully");

    process.exit();

})
.catch(err => {
    console.log(err);
    process.exit(1);
});