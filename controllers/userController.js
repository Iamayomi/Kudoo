const jwt = require("jsonwebtoken");
const User = require("./../models/userModel");
const catchAsyncErr = require("../utils/catchAsync");
const appError = require("../utils/appErr");


const signToken = id => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
};

const cookiesOption = {
    expires: new Date(Date.now() + process.env.JWT_COOKIES_EXPIRES_IN * 24 * 60 * 60 * 1000),
    httpOnly: true
};


if (process.env.NODE_ENV === 'production') cookiesOption.secure = true;

exports.getAllUser = async function (req, res) {
  try {
    const getAllUser = await User.findAll();

    res.status(200).json({
      status: "succes",
      data: {
        users: getAllUser
      }
    })
  } catch (err) {
    res.status(400).send(err.message);
  }
};



exports.changeUserEmail = async function(req, res, next) {

    const { email } = req.body;

    const userId = req.user.id;

    const user = await User.findOne({ where : { id: userId }});
    
    user.email = email;

    user.save({ validate: false });

    const token = signToken(user.id);

    res.cookie('jwt', token, cookiesOption);

    res.status(201).json({
        status: "success",
        token,
        data: {
            users: user
        }
    });

    next();
};


exports.changeUserPassword = async function(req, res, next) {

    const { password } = req.body;

    const userId = req.user.id;

    const user = await User.findOne({ where : { id: userId }});
    
    user.password = password;

    user.save({ validate: false });

    const token = signToken(user.id);

    res.cookie('jwt', token, cookiesOption);

    res.status(201).json({
        status: "success",
        token,
        data: {
            users: user
        }
    });

    next();
};


exports.changeUserUsername = async function(req, res, next){
    const { username, password } = req.body;

    const user = req.user;

    // check if the password exist
    if (!await User.comparePassword(password, user.password)) {
        return next(new appError('Invalid password', 401));
    };

    user.username = username;

    user.save({ validate: false });

    // if the user exist, sign token for the user
    const token = signToken(user.id);

    res.cookie('jwt', token, cookiesOption);

    res.status(200).json({
        status: "success",
        token
    });

    next();

 };



















