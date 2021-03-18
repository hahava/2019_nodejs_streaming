import express from 'express';
import fs from 'fs';

const router = express.Router();

router.get('/*', (req, res, next) => {
  if (req.session.userId == null) {
    res.redirect('/login');
  } else {
    next();
  }
});

router.get('/:type', (req, res) => {
  const { type } = req.params;
  const fileList = fs.readdirSync(`./public/video/${type}`);
  res.render('video', {
    list: fileList,
    type,
  });
});

export default router;
