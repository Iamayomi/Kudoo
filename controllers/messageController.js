const message = require("../models/messageModel");
const User = require('../models/userModel');
const appError =  require("../utils/appErr");
const catchAsyncErr = require("../utils/catchAsync");


// send message
exports.sendMessage = catchAsyncErr(async function (req, res) {

	    if(!req.body.username) req.params.username = req.user.username;

		const user = await User.findOne({ where: { username: req.params.username } });

		const sendMessage = await message.create({ message: req.body.message, userId: user.id });

		res.status(201).json({
			status: 'success',
			data: {
				messages: sendMessage
			}
		})
});


// Get all messages
exports.getAllMessages = catchAsyncErr(async function(req, res){

	    if(!req.body.username) req.params.username = req.user.username;

		const user = await User.findOne({ where: { username: req.params.username } });

		const allmessages = await message.findAll({ where: { userId: user.id } } );

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