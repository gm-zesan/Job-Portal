const jwt = require("jsonwebtoken");
const { createError } = require("./error");
const { promisify } = require("util");

//Token verify using callback function
// exports.verifyToken = (req, res, next) => {
//     //for header barrer token use next line which is commented
//     // const token = req.headers?.authorization?.split(" ")?.[1];

//     // =======================================================
//     //for cookies token use this next line
//     const token = req.cookies.access_token;

//     if (!token) {
//         return next(createError(401, "You are not authenticated!"));
//     }

//     jwt.verify(token, process.env.JWT, (err, user) => {
//         if (err) return next(createError(403, "Token is not valid!"));
//         req.user = user;
//         next();
//     });
// };
//Token verify using async await
exports.verifyToken = async (req, res, next) => {
    const token = req.headers?.authorization?.split(" ")?.[2];
    if (!token) {
        return next(createError(401, "You are not authenticated!"));
    }

    jwt.verify(token, process.env.JWT, (err, user) => {
        if (err) return next(createError(403, "Token is not valid!"));
        req.user = user;
        next();
    });
};

// User verify
exports.verifyUser = (req, res, next) => {
    if (req.user.id === req.params.id || req.user.role === "Admin") {
        next();
    } else {
        console.log("decline");
        return next(createError(403, "You are not authorized!"));
    }
};

// Admin verify
exports.verifyAdmin = (req, res, next) => {
    if (req.user.role === "Admin") {
        next();
    } else {
        return next(createError(403, "You are not authorized!"));
    }
};

// Hiring manager verify
exports.verifyHiringManager = (req, res, next) => {
    if (req.user.role === "Hiring-Manager" || req.user.role === "Admin") {
        next();
    } else {
        return next(createError(403, "You are not authorized!"));
    }
};
