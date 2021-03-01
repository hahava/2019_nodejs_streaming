import nodemailer from 'nodemailer';
import fs from 'fs';

const mailer = async function () {
  const emailAddress = JSON.parse(fs.readFileSync('./config/email.json', 'utf-8'));
  const transporter = nodemailer.createTransport({
    host: 'smtp.daum.net',
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: emailAddress.id,
      pass: emailAddress.pw,
    },
  });

  // setup email data with unicode symbols
  const mailOptions = {
    from: '"Fred Foo 👻" <hahava@hanmail.net>', // sender address
    to: 'hahava@naver.com', // list of receivers
    subject: 'Hello ✔', // Subject line
    text: 'Hello world?', // plain text body
    html: '<b>Hello world?</b>', // html body
  };

  const info = await transporter.sendMail(mailOptions);
  console.log('Message sent: %s', info.messageId);
  console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
};

export default mailer;
