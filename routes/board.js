const express = require('express');
const router = express.Router();
const mailer = require('../util/nodeMailer');

router.get('/', (req, res, next) => {
    mailer.sendMail().catch(console.error);
    res.send("success!");
});

module.exports = router;