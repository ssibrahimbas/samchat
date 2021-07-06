const express = require("express")
const path = require("path")
const root = path.dirname(require.main.filename)
const router = express.Router()

router.get('/login', (req, res, next) => {
    res.sendFile(`${root}/public/pages/main/index.html`)
})

router.get('/register', (req, res, next) => {
    res.sendFile(`${root}/public/pages/register/register.html`)
})

module.exports = router