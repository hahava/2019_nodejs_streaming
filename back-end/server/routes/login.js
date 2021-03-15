import crypto from 'crypto';
import express from 'express';

const router = express.Router();

// login page
router.get('/', (req, res, next) => {
  if (req.session.userId != null) {
    console.log('login');
    res.redirect('/');
  } else {
    res.render('login');
  }
});

// login post request
router.post('/', (req, res) => {
  const id = 'hafamily';
  const pw = 'ae5cf86f2a3a99a943b420c20d7df82f5e6fbed70349f7b1918e0b369bb0c4fd';

  const inputId = req.body.username;
  const inputPw = req.body.password;

  const secret = 'abcdefg';
  const hash = crypto.createHmac('sha256', secret)
    .update(inputPw)
    .digest('hex');
  console.log(hash);

  if (inputId === id && hash === pw) {
    req.session.userId = id;
    res.status(200)
      .redirect('/');
  } else {
    res.send('<script>alert("암호가 틀렸습니다.");'
      + 'history.go(-1)</script>');
  }
});

export default router;
