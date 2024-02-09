
const appError = require("../utils/appErr");

const errDev = (err, res) => {
	res.status(err.statusCode).json({
		status: err.status,
		error: err,
		message: err.message,
		stack: err.stack
	});
}

const handleValidatorError = err => {
	const message = `this ${err.path} has already been taken by a user ${err.value} input another ${err.path}`;
	return new appError(message, 401)
};

const confirmPasswordError = err => {
	const message = `${err.message}`;
	return new appError(message, 401)
};

const handleJwTError = err => {
     return new appError('Invalid token. Please log in again', 400);
};

const errProd = (err, res) => {

	if (err.isOperational) {
		res.status(err.statusCode).json({
			status: err.status,
			message: err.message
		})
	} else {
		console.error("Error", err);

		res.status(500).json({
			status: 'error',
			message: 'something went wrong'
		})

	}

};


module.exports = function (err, req, res, next) {

	err.statusCode = err.statusCode || 500;
	err.status = err.status || 'error';

	if (process.env.NODE_ENV === 'development') {
		errDev(err, res);
	};

	if (process.env.NODE_ENV === 'production') {
		let error = err;

		if (err.name === 'SequelizeUniqueConstraintError') {
			Object.values(err.errors).forEach(val => error = handleValidatorError(val));
		};

		if (err.name === 'TypeError') {
			error = confirmPasswordError(err);
		}else if (err.name === 'JsonWebTokenError') {
			error = handleJwTError(err);
		}


		errProd(error, res);
	}
};



