const path = require("path");
const root = path.dirname(require.main.filename);

const Conversation = require(`${root}/models/Conversation`);

const errorWrapper = require(`${root}/helpers/error/errorWrapper`);
const CustomError = require(`${root}/helpers/error/CustomError`);

const askNewConversation = errorWrapper(async (req, res, next) => {
    const {senderId, receiverId} = req.params;
    const savedConversation = await Conversation.create({
        members: [senderId, receiverId],
    });
    res.status(200).json({
        success: true,
        data: savedConversation,
    });
});

const getConversationByUserId = errorWrapper(async (req, res, next) => {
    const {userId} = req.params;
    const conversation = await Conversation.find({
        members: {$in: [userId]},
    });
    res.status(200).json({
        success: true,
        data: conversation,
    });
});

const getConversationByTwoUserId = errorWrapper(async (req, res, next) => {
    const {userId, receiverId} = req.params;
    const conversation = await Conversation.findOne({
        members: {$all: [userId, receiverId]},
    });
    res.status(200).json({
        success: true,
        data: conversation,
    });
});

const checkConversationByUserIdAndReceiverId = errorWrapper(
    async (req, res, next) => {
        const {senderId, receiverId} = req.params;
        const conversation = await Conversation.findOne({
            members: {$all: [senderId, receiverId]},
        });
        if (conversation)
            next(
                new CustomError("You already have a conversation with this user", 500)
            );
        next();
    }
);

module.exports = {
    askNewConversation,
    getConversationByUserId,
    getConversationByTwoUserId,
    checkConversationByUserIdAndReceiverId,
};
