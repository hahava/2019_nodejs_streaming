import cookieParser from 'cookie-parser';
import 'core-js/stable';
import express from 'express';
import path from 'path';
import 'regenerator-runtime/runtime';
import dotEnv from 'dotenv';
import mongoose from 'mongoose';
import loginRouter from './api/auth/route/loginRoute';

dotEnv.config({ path: path.join(__dirname, './.env') });

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'front')));
app.set('views', path.join(__dirname, '/front'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

app.use('/api/auth', loginRouter);

app.get('*', (req, res) => {
  res.render('index.html');
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
  });

export default app;
