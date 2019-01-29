var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var express_session = require('express-session');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express_session({
    key: 'myFamily',
    secret: "kalin",
    cookie: {
        maxAge: 1000 * 60 * 120
    }
}))
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Router
var indexRouter = require('./routes/index');
var loginRouter = require('./routes/login');
var videoRouter = require('./routes/video');
var playerRouter = require('./routes/player');
var logoutRouter = require('./routes/logout');

app.use('/', indexRouter);
app.use('/login', loginRouter);
app.use('/video', videoRouter);
app.use('/player', playerRouter);
app.use('/logout', logoutRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    // next(createError(404));
    res.render('customerror');
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
})
module.exports = app;
