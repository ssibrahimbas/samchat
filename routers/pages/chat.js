const express = require("express")
const path = require("path")
const root = path.dirname(require.main.filename)
const { getAccessToPage } = require(`${root}/middlewares/auth/auth`);

const router = express.Router()

router.get('/', getAccessToPage, (req, res, next) => {
    res.sendFile(`${root}/public/pages/chat/chat.html`)
})

module.exports = router