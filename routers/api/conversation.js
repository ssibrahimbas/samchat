const express = require("express");
const router = express.Router();

const path = require("path");
const root = path.dirname(require.main.filename);
const controllers = `${root}/controllers`

const {
  askNewConversation,
  getConversationByUserId,
  checkConversationByUserIdAndReceiverId,
  getConversationByTwoUserId,
} = require(`${controllers}/conversation`);

router.post(
  "/:senderId/to/:receiverId",
  checkConversationByUserIdAndReceiverId,
  askNewConversation
);
router.get("/:userId", getConversationByUserId);
router.get("/:userId/with/:receiverId", getConversationByTwoUserId);
module.exports = router;
