import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
  if (req.session.userId == null) {
    res.redirect('/login');
  } else {
    res.render('index');
  }
});

export default router;
