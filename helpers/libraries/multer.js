const multer = require("multer");
const path = require("path");
const CustomError = require("../error/CustomError");

const profileImageStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        const rootDir = path.dirname(require.main.filename);
        cb(null, path.join(rootDir, "/public/uploads/images"));
    },
    filename: (req, file, cb) => {
        const extension = file.mimetype.split("/")[1];
        req.savedProfileImage = "profileImage_" + req.user.id + "." + extension;
        cb(null, req.savedProfileImage);
    },
});

const ImageFileFilter = (req, file, cb) => {
    let allowedMimeTypes = ["image/jpg", "image/gif", "image/jpeg", "image/png"];
    if (!allowedMimeTypes.includes(file.mimetype))
        cb(new CustomError("Please provide a valid image file", 400), false);
    return cb(null, true);
};

const profileImageUpload = multer({
    storage: profileImageStorage,
    fileFilter: ImageFileFilter,
});

module.exports = {
    profileImageUpload,
};
