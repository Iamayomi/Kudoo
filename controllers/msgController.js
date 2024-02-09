const msg = require("../models/msgModel");
const User = require('../models/userModel');
const appError =  require("../utils/appErr");
const catchAsyncErr = require("../utils/catchAsync");


exports.sendMsg = catchAsyncErr(async function (req, res) {

		const user = await User.findOne({ where: { username: req.params.username } });

		const sendMsg = await msg.create({ message: req.body.message, userId: user.id });

		res.status(201).json({
			status: 'success',
			data: {
				messages: sendMsg
			}
		})
});


exports.getAllMessages = catchAsyncErr(async function(req, res){

		const user = await User.findOne({ where: { username: req.params.username } });

		const allmessages = await msg.findAll({ where: { userId: user.id } } );

		if (!allmessages) {
           return next(new appError("No messages yet", 400));

		}

		res.status(201).json({
			status: 'success',
			data: {
				messages: allmessages
			}
		})

});