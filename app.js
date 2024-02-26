const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const xss = require("xss-clean");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const cors = require("cors");

const userRoutes = require("./routes/userRoute");
const messageRoutes = require("./routes/messageRoute");
const viewsRoutes = require("./routes/viewsRoute");
const globalErrorHandler = require("./controllers/errController");
const appError = require("./utils/appErr");

const app = express();


if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
};

app.use(cors());

// app.use((req, res, next) => {
// 	console.log(req.cookie);
// 	next();
// });

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json({ limit: '10kb' }));

app.use(cookieParser());
app.use(xss());

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));



app.use('/', viewsRoutes);
app.use('/kudoo/users', userRoutes);
app.use('/kudoo/message', messageRoutes);


// URL error
app.all("*", (req, res, next) => {
    next(new appError(`can't find ${req.originalUrl}`, 404));
});


app.use(globalErrorHandler);

module.exports = app;