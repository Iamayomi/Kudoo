const User = require("./../models/userModel");
const catchAsyncErr = require("../utils/catchAsync");


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

exports.updateUser = async function (req, res) {
  try {
    const { email } = req.body;

    const user = req.user;

    user.email = email;
    await user.save();
    console.log(user);
    res.status(200).json({
      status: "succes",
      data: {
        user
      }
    })
  } catch (err) {
    res.status(400).send(err.message);
  }
};



