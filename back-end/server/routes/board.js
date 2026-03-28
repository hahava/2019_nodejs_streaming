import express from 'express';
import { StatusCodes } from 'http-status-codes';
import mailer from '../common/util/nodeMailer';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    await mailer.sendMail();
    res.status(StatusCodes.OK).send('success!');
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send('failed');
  }
});

export default router;
