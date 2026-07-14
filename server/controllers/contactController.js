const Contact = require("../models/Contact");

// Save Contact Message
exports.sendMessage = async (req, res) => {

    try {

        const { name, email, subject, message } = req.body;

        if (!name || !email || !subject || !message) {

            return res.status(400).json({
                success: false,
                message: "Please fill all fields."
            });

        }

        const contact = await Contact.create({
            name,
            email,
            subject,
            message
        });

        res.status(201).json({
            success: true,
            message: "Message sent successfully.",
            data: contact
        });

    } catch (err) {

        res.status(500).json({
            success: false,
            message: err.message
        });

    }

};