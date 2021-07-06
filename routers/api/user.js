const express = require("express");
const router = express.Router();

const path = require("path");
const root = path.dirname(require.main.filename);
const controllers = `${root}/controllers`

const { getAllUser, getUserById } = require(`${controllers}/user`);

router.get("/getall", getAllUser);
router.get("/:id", getUserById);

module.exports = router;
