const path = require("path");
const root = path.dirname(require.main.filename);

const User = require(`${root}/models/User`);

const errorWrapper = require(`${root}/helpers/error/errorWrapper`);
const CustomError = require(`${root}/helpers/error/CustomError`);

const register = errorWrapper(async (req, res, next) => {
    const information = req.body;
    const user = await User.create({...information});
    sendTokenClient(user, res, 200);
});

const login = errorWrapper(async (req, res, next) => {
    const {email, password} = req.body;
    if (!validateUserInputs(email, password))
        next(new CustomError("Please check your inputs", 400));
    const user = await User.findOne({email}).select("+password");
    if (!user || !checkPassword(password, user.password))
        next(new CustomError("Please check your credentials", 404));
    sendTokenClient(user, res, 200);
});

const logout = errorWrapper(async (req, res, next) => {
    const {NODE_ENV} = process.env;
    return res
        .status(200)
        .cookie({
            httpOnly: true,
            expires: new Date(Date.now()),
            secure: NODE_ENV === "development" ? false : true,
        })
        .json({
            success: true,
            message: "Logout successfully",
        });
});

const imageUpload = errorWrapper(async (req, res, next) => {
    await User.findByIdAndUpdate(
        req.user.id,
        {
            profileImage: req.savedProfileImage,
        },
        {
            new: true,
            runValidators: true,
        }
    );
    res.status(200).json({
        success: true,
        message: "Image Upload Successful",
    });
});

const sendTokenClient = (user, res, status) => {
    const token = user.getTokenFromUserModel();
    const {JWT_COOKIE_EXPIRE, NODE_ENV} = process.env;
    return res
        .status(status)
        .cookie("token", token, {
            httpOnly: true,
            expires: new Date(Date.now() + parseInt(JWT_COOKIE_EXPIRE) * 1000 * 60),
            secure: NODE_ENV === "development" ? false : true,
        })
        .json({
            success: true,
            token,
            data: {
                id: user._id,
                name: user.name,
                email: user.email,
                password: user.password,
            },
        });
};

const validateUserInputs = (email, password) => email && password;
const checkPassword = (password, secondPassword) => {
    // return bcrypt.compareSync(password, hashedPasword);
    return password === secondPassword;
};

module.exports = {
    register,
    login,
    logout,
    imageUpload,
};
