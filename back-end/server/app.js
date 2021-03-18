import cookieParser from 'cookie-parser';
import 'core-js/stable';
import express from 'express';
import path from 'path';
import 'regenerator-runtime/runtime';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'front')));

// setup view engine
app.set('views', path.join(__dirname, '/front'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

app.get('*', (req, res) => {
  res.render('index.html');
});
export default app;
