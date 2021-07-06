const path = require("path");
const root = path.dirname(require.main.filename);

const Message = require(`${root}/models/Message`);

const errorWrapper = require(`${root}/helpers/error/errorWrapper`);

const askNewMessage = errorWrapper(async (req, res, next) => {
    const information = req.body;
    const savedMessage = await Message.create({
        ...information,
        // TODO --> senderId: req.userId
    });
    res.status(200).json({
        success: true,
        data: savedMessage,
    });
});

const getAllMessage = errorWrapper(async (req, res, next) => {
    const {conversationId} = req.params;
    const messages = await Message.find({
        conversation: {
            _id: conversationId,
        },
    }).populate(["conversation", "sender", "receiver"]);
    res.status(200).json({
        success: true,
        data: messages,
    });
});

const seenMessage = errorWrapper(async (req, res, next) => {
    const {messageId} = req.params;
    const message = await Message.findById(messageId);
    message.isSeen = true;
    message = await message.save();
    res.status(200).json({
        sucess: true,
        message: "message is seen successfully",
    });
});

const seenAllMessages = errorWrapper(async (req, res, next) => {
    const {conversationId} = req.params;
    const messages = await Message.find({
        conversation: {
            _id: conversationId,
        },
    });

    await seenMultiMessage(messages);

    res.status(200).json({
        sucess: true,
        message: "messages is seen successfully",
    });
});

const seenAllByOneUserMessages = errorWrapper(async (req, res, next) => {
    const {conversationId, userId} = req.params;
    const messages = await Message.find({
        conversation: {
            _id: conversationId,
        },
        sender: {
            _id: userId,
        },
    });
    await seenMultiMessage(messages);
    res.status(200).json({
        success: true,
        message: "messages is seen successfully",
    });
});

const seenSingleMessage = errorWrapper(async (message) => {
    message.isSeen = true;
    return (message = await message.save());
});

const seenMultiMessage = errorWrapper(async (messages) => {
    messages.forEach((message) => {
        seenSingleMessage(message);
    });
});

module.exports = {
    getAllMessage,
    askNewMessage,
    seenMessage,
    seenAllMessages,
    seenAllByOneUserMessages,
};
