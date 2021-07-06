const express = require("express");
const router = express.Router();

const path = require("path");
const root = path.dirname(require.main.filename);
const controllers = `${root}/controllers`;

const {
  getAllMessage,
  askNewMessage,
  seenMessage,
  seenAllMessages,
  seenAllByOneUserMessages
} = require(`${controllers}/message`);

router.get("/:conversationId", getAllMessage);
router.get("/seen/:messageId", seenMessage);
router.get("/seenAllTwoUser/:conversationId", seenAllMessages);
router.get("/seenAllOneUser/:conversationId/:userId", seenAllByOneUserMessages);
router.post("/add", askNewMessage);

module.exports = router;
