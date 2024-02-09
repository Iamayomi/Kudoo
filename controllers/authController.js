const jwt = require("jsonwebtoken");
const User = require('../models/userModel');
const appError = require("../utils/appErr");
const catchAsyncErr = require("../utils/catchAsync");
const {promisify} = require("util");


const signToken = id => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
};

const cookiesOption = {
    expires: new Date(Date.now() + process.env.JWT_COOKIES_EXPIRES_IN * 24 * 60 * 60 * 1000),
    httpOnly: true,
    sameSite: 'lax'
};


if (process.env.NODE_ENV === 'production') cookiesOption.secure = true;

exports.register = catchAsyncErr(async function (req, res, next) {

    const data = {
        username: req.body.username,
        email: req.body.email,
        role: req.body.role,
        password: req.body.password,
        confirmPassword: req.body.confirmPassword,
        passwordResetToken: req.body.passwordResetToken,
        passwordResetExpires: req.body.passwordResetExpires
    };

    const newUser = await User.create(data);

    const token = signToken(newUser.id);

    res.cookie('jwt', cookiesOption);

    res.status(201).json({
        sattus: "success",
        token,
        data: {
            users: newUser
        }
    });
    next();
});


exports.loginUser = catchAsyncErr(async function (req, res, next) {
    const { username, password } = req.body;

    //  check if their was empty input
    if (!username || !password) {
        return next(new appError("provide a username and password", 400));
    };

    const user = await User.findOne({ where: { username: username } });

   // check if the username and password exist
    if (!user || !await User.comparePassword(password, user.password)) {
        return next(new appError('Invalid username or password', 401));
    };

    // if the user exist, sign token for the user
    const token = signToken(user.id);

    res.cookie('jwt', cookiesOption);

    res.status(200).json({
        status: "success",
        token
    });

    next();
});


exports.protectRoutes = catchAsyncErr(async function (req, res, next) {

    let token;

    if (req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(" ")[1];
    };


    if (!token) {
        next(new appError("You are not logged in, please log in to get access!", 401));
    };

    const decode = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    const currentUser = await User.findByPk(decode.id);

    if (!currentUser) {
        next(new appError("The user belonging to this token does not longer exist.", 401));
    };

    function isPasswordChangedAt() {
        const changeTimeStamp = parseInt(currentUser.createdAt.getTime() / 1000);

        return decode.iat < changeTimeStamp;
    };

    if (isPasswordChangedAt()) {
        return next(new appError("This User recently changed password", 401));
    };

    req.user = currentUser;

    next();
});


exports.isLoggedIn = catchAsyncErr(async function (req, res, next) {

    console.log(req.cookies);

       // verify the token
    //     if (req.cookies.){

    //  //  console.log(req.cookies.jwt);
    //     const decode = await promisify(jwt.verify)(req.cookies.jwt, process.env.JWT_SECRET);
    
    //    // check if the user still exist
    //     const currentUser = await User.findByPk(decode.id);

    //     if (!currentUser) {
    //         next();
    //     };

        
    //     // this function check if the user changed password after the token was issued
    //     function isPasswordChangedAt() {
    //         const changeTimeStamp = parseInt(currentUser.createdAt.getTime() / 1000);

    //         return decode.iat < changeTimeStamp;
    //     };

    //     //  check if the user changed password after the token was issued
    //     if (isPasswordChangedAt()) {
    //         next();
    //     };

    //    // User is logged in
    //     req.locals.user = currentUser;
    //     next();
    // };
    next();
});

exports.logout = catchAsyncErr(async function (req, res, next) {
    res.cookie('jwt', 'logout', {
        expires: new Date(Date.now() + 10 * 1000),
        httpOnly: true,
        sameSite: 'lax'
    });

    res.status(200).json({
        status: 'success'
    });
});













