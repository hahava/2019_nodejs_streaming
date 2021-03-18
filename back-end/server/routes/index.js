import express from 'express';

const router = express.Router();

router.get('/', (req, res, next) => {
  console.log('index');
  if (req.session.userId == null) {
    res.redirect('/login');
  } else {
    res.render('index');
  }
});

export default router;
