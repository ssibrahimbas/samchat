const sendJwtToClient = (user, res) => {
    const token = user.getTokenFromUserModel();
    const {JWT_COOKIE, NODE_ENV} = process.env;
    return res.status(200).cookie("access_token", token, {
        httpOnly: true,
        expires: new Date(Date.now() + parseInt(JWT_COOKIE) * 10000 * 60),
        secure: NODE_ENV === "development" ? false : true,
    });
};

module.exports = {
    sendJwtToClient,
};
