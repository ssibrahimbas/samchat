const CustomError = require("../../helpers/error/CustomError");
const errorWrapper = require("../../helpers/error/errorWrapper");
const jwt = require("jsonwebtoken");

const getAccessToRoute = errorWrapper(async (req, res, next) => {
    if (!isTokenIncluded(req))
        next(new CustomError("You are not authorized to access this page", 403));
    const accessToken = getAccessTokenFromHeader(req, res);
    if (!accessToken) next(new CustomError("You are not authorized to access this pagexxx", 401))
    jwt.verify(accessToken, process.env.JWT_SECRET_KEY, (err, decodedToken) => {
        if (err)
            next(new CustomError("You are not authorized to access this page", 401));
        req.user = {
            id: decodedToken.id,
            name: decodedToken.name,
        };
        next();
    });
});


const getAccessToPage = errorWrapper(async (req, res, next) => {
    const accessToken = !!req.headers.cookie && req.headers.cookie.split("=")[1]
    if (!accessToken) next(new CustomError("You are not authorized to access this page", 401))
    jwt.verify(accessToken, process.env.JWT_SECRET_KEY, (err, decodedToken) => {
        if (err) next(new CustomError("You are not authorized to access this page", 401))
        next()
    })
})

const getAccessTokenFromHeader = (req) => {
    return !!req.headers.authorization && req.headers.authorization.split(" ")[1];
};

const isTokenIncluded = (req) => {
    return (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer: ")
    );
};

module.exports = {
    getAccessToRoute,
    getAccessToPage
};
