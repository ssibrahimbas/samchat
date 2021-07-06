const express = require("express");
const router = express.Router();

const path = require("path");
const root = path.dirname(require.main.filename);
const controllers = `${root}/controllers`
const middlewares = `${root}/middlewares`
const helpers = `${root}/helpers`

const { register, login, logout, imageUpload } = require(`${controllers}/auth`);
const { getAccessToRoute } = require(`${middlewares}/auth/auth`);

const { profileImageUpload } = require(`${helpers}/libraries/multer`);

router.post(
  "/upload",
  [getAccessToRoute, profileImageUpload.single("profile_image")],
  imageUpload
);
router.post("/register", register);
router.post("/login", login);
router.get("/logout", getAccessToRoute, logout);

module.exports = router;
