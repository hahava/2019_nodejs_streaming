import cookieParser from 'cookie-parser';
import 'core-js/stable';
import express from 'express';
import express_session from 'express-session';
import logger from 'morgan';
import path from 'path';
import 'regenerator-runtime/runtime';
import boardRouter from './routes/board';
import indexRouter from './routes/index';
import loginRouter from './routes/login';
import logoutRouter from './routes/logout';
import playerRouter from './routes/player';
import videoRouter from './routes/video';

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'front/resources')));
app.use(express_session({
  key: 'myFamily',
  secret: 'kalin',
  resave: true,
  saveUninitialized: true,
  cookie: {
    maxAge: 1000 * 60 * 120,
  },
}));

// setup view engine
app.set('views', path.join(__dirname, 'front/views'));
app.set('view engine', 'ejs');

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
});
export default app;
