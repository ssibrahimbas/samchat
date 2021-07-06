const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String,
        required: [true, "Please provide a name"],
    },
    email: {
        type: String,
        required: [true, "Please provide a email"],
        unique: true,
        match: [
            /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
            "Please provide a valid email",
        ],
    },
    password: {
        type: String,
        minlength: [6, "Please provide a password with min length 6"],
        required: [true, "Please provide a password"],
        select: false,
    },
    profileImage: {
        type: String,
        default: "default.jpg",
    },
});

UserSchema.methods.getTokenFromUserModel = function () {
    const {JWT_SECRET_KEY, JWT_EXPIRE} = process.env;
    console.log("JWT:", JWT_SECRET_KEY, JWT_EXPIRE);
    const payload = {
        id: this._id,
        name: this.name,
    };
    const token = jwt.sign(payload, JWT_SECRET_KEY, {expiresIn: JWT_EXPIRE});
    return token;
};

module.exports = mongoose.model("User", UserSchema);
