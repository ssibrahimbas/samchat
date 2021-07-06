const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ConversationModel = new Schema({
    members: [
        {
            type: mongoose.Schema.ObjectId,
            ref: "User",
            role: {
                type: String,
                enum: ["sender", "receiver"],
            }
        },
    ],
});

module.exports = mongoose.model("Conversation", ConversationModel);
