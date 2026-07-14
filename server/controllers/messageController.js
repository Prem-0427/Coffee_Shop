const Message = require("../models/Message");

// ===================================
// Send Contact Message
// ===================================
exports.sendMessage = async (req, res) => {
    try {

        const { name, email, message } = req.body;

        const newMessage = new Message({
            name,
            email,
            message,
            status: "Unread"
        });

        await newMessage.save();

        res.status(201).json({
            success: true,
            message: "Message sent successfully"
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

// ===================================
// Get All Messages
// ===================================
exports.getMessages = async (req, res) => {
    try {

        const messages = await Message.find()
            .sort({ createdAt: -1 });

        res.status(200).json(messages);

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

// ===================================
// Mark Message as Read
// ===================================
exports.markAsRead = async (req, res) => {
    try {

        const message = await Message.findByIdAndUpdate(
            req.params.id,
            { status: "Read" },
            { new: true }
        );

        if (!message) {
            return res.status(404).json({
                success: false,
                message: "Message not found"
            });
        }

        res.json({
            success: true,
            message: "Message marked as read",
            data: message
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

// ===================================
// Delete Message
// ===================================
exports.deleteMessage = async (req, res) => {
    try {

        const message = await Message.findByIdAndDelete(req.params.id);

        if (!message) {
            return res.status(404).json({
                success: false,
                message: "Message not found"
            });
        }

        res.json({
            success: true,
            message: "Message deleted successfully"
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};