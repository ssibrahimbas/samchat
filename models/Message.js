const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const MessageSchema = new Schema({
    conversation: {
        type: mongoose.Schema.ObjectId,
        required: true,
        ref: "Conversation",
    },
    sender: {
        type: mongoose.Schema.ObjectId,
        required: true,
        ref: "User",
    },
    receiver: {
        type: mongoose.Schema.ObjectId,
        required: true,
        ref: "User",
    },
    message: String,
    isSeen: {
        type: Boolean,
        default: false,
    },
    dateTime: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("Message", MessageSchema);
