const express = require("express");
const user = require("./api/user");
const message = require("./api/message");
const conversation = require("./api/conversation");
const auth = require("./api/auth");

const authPages = require('./pages/auth')
const chat = require('./pages/chat')
const lobby = require('./pages/lobby')

const router = express.Router();

router.use("/api/auth", auth)
router.use("/api/user", user)
router.use("/api/messages", message)
router.use("/api/conversation", conversation)

router.use('/auth', authPages)
router.use('/chat', chat)
router.use('/lobby', lobby)

module.exports = router;
