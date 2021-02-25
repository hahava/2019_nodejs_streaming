import express from 'express';
import mailer from '../util/nodeMailer';

const router = express.Router();

router.get('/', (req, res, next) => {
    mailer.sendMail().catch(console.error);
    res.send("success!");
});

export default router;