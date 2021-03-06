import cookieParser from 'cookie-parser';
import 'core-js/stable';
import express from 'express';
import path from 'path';
import 'regenerator-runtime/runtime';
import * as dotEnv from 'dotenv';
import mongoose from 'mongoose';
import http from 'http';
import ejs from 'ejs';
import morgan from 'morgan';
import loginRouter from './api/auth/route/loginRoute';
import videoRouter from './api/video/router/videoRouter'
import jwtMiddleware from './common/middleware/jwtMiddleware';

dotEnv.config({ path: path.join(__dirname, './.env') });

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'front')));
app.set('views', path.join(__dirname, '/front'));
app.set('view engine', 'ejs');
app.engine('html', ejs.renderFile);

app.use(morgan(process.env.LOG_LEVEL));
app.use(jwtMiddleware);
app.use('/api/auth', loginRouter);
app.use('/api/video', videoRouter);

app.get('*', (req, res) => {
  res.render('index.html');
});

const port = process.env.PORT || '5696';
app.set('common', port);

const server = http.createServer(app);
server.listen(port, () => {
  console.log("listen")
});

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useFindAndModify: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('MongoDB is connected');
  })
  .catch(e => {
    console.error(e);
    server.close();
  });

export default app;
