const express = require('express')

const path = require("path");
const root = path.dirname(require.main.filename);

const staticFiles = [
    express.static(`${root}/public`),
    express.static(`${root}/public/pages/main`),
    express.static(`${root}/public/pages/chat`),
    express.static(`${root}/public/pages/lobby`),
    express.static(`${root}/public/pages/register`),
    express.static(`${root}/public/pages/tools/Alertify`)
]

module.exports = {
    staticFiles
}