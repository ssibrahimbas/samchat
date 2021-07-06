const path = require("path");
const root = path.dirname(require.main.filename);

const User = require(`${root}/models/User`);

const errorWrapper = require(`${root}/helpers/error/errorWrapper`);

const getAllUser = errorWrapper(async (req, res, next) => {
    const users = await User.find();
    res.status(200).json({
        success: true,
        data: users,
    });
});

const getUserById = errorWrapper(async (req, res, next) => {
    const {id} = req.params;
    const user = await User.findById(id);
    res.status(200).json({
        success: true,
        data: user,
    });
});

module.exports = {
    getAllUser,
    getUserById,
};
