const express = require('express');
const router = express.Router();
const nodemailer = require("nodemailer");
const fs = require('fs');

const main = async function () {
    var emailAddress = JSON.parse(fs.readFileSync('./config/email.json', 'utf-8'));
    let transporter = nodemailer.createTransport({
        host: "smtp.daum.net",
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
            user: emailAddress.id,
            pass: emailAddress.pw
        }
    });

    // setup email data with unicode symbols
    let mailOptions = {
        from: '"Fred Foo 👻" <hahava@hanmail.net>', // sender address
        to: "hahava@naver.com", // list of receivers
        subject: "Hello ✔", // Subject line
        text: "Hello world?", // plain text body
        html: "<b>Hello world?</b>" // html body
    };

    let info = await transporter.sendMail(mailOptions)
    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
};

module.exports = router;
module.exports.sendMail = main;