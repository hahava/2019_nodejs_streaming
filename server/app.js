import createError from 'http-errors';
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import express_session from 'express-session';
import "core-js/stable";
import "regenerator-runtime/runtime";

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express_session({
    key: 'myFamily',
    secret: "kalin",
    resave: true,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000 * 60 * 120
    }
}))
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Router
const indexRouter = require('./routes/index');
const loginRouter = require('./routes/login');
const videoRouter = require('./routes/video');
const playerRouter = require('./routes/player');
const logoutRouter = require('./routes/logout');
const boardRouter = require('./routes/board');

app.use('/', indexRouter);
app.use('/login', loginRouter);
app.use('/video', videoRouter);
app.use('/player', playerRouter);
app.use('/logout', logoutRouter);
app.use('/board', boardRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
    // next(createError(404));
    res.render('customerror');
});

// error handler
app.use((err, req, res, next) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
})
module.exports = app;
