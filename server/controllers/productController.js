const Product = require("../models/Product");

// =======================================
// Get All Products
// =======================================

exports.getProducts = async (req, res) => {

    try {

        const products = await Product.find().sort({ createdAt: -1 });

        res.status(200).json(products);

    } catch (err) {

        res.status(500).json({
            success: false,
            message: err.message
        });

    }

};

// =======================================
// Get Single Product
// =======================================

exports.getProduct = async (req, res) => {

    try {

        const product = await Product.findById(req.params.id);

        if (!product) {

            return res.status(404).json({
                success: false,
                message: "Product not found"
            });

        }

        res.status(200).json(product);

    } catch (err) {

        res.status(500).json({
            success: false,
            message: err.message
        });

    }

};

// =======================================
// Add Product
// =======================================

exports.addProduct = async (req, res) => {

    try {

        const product = new Product(req.body);

        await product.save();

        res.status(201).json({

            success: true,
            message: "Product Added Successfully",
            product

        });

    } catch (err) {

        res.status(500).json({

            success: false,
            message: err.message

        });

    }

};

// =======================================
// Update Product
// =======================================

exports.updateProduct = async (req, res) => {

    try {

        const product = await Product.findByIdAndUpdate(

            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }

        );

        if (!product) {

            return res.status(404).json({

                success: false,
                message: "Product not found"

            });

        }

        res.json({

            success: true,
            message: "Product Updated Successfully",
            product

        });

    } catch (err) {

        res.status(500).json({

            success: false,
            message: err.message

        });

    }

};

// =======================================
// Delete Product
// =======================================

exports.deleteProduct = async (req, res) => {

    try {

        const product = await Product.findByIdAndDelete(req.params.id);

        if (!product) {

            return res.status(404).json({

                success: false,
                message: "Product not found"

            });

        }

        res.json({

            success: true,
            message: "Product Deleted Successfully"

        });

    } catch (err) {

        res.status(500).json({

            success: false,
            message: err.message

        });

    }

};