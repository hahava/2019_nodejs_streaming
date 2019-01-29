var express = require('express');
var router = express.Router();
var mailer = require('../util/nodeMailer');
var fs = require('fs');
router.get('/', function (req, res, next) {
    mailer.sendMail().catch(console.error);
    res.send("success!");
});

module.exports = router;