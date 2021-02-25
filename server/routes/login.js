const express = require('express');
const router = express.Router();
const crypto = require('crypto');

// login controller

// login page
router.get('/', (req, res, next) => {
    if (req.session.userId != null) {
        console.log("login");
        res.redirect('/');
    } else {
        res.render("login")
    }
});

// login post request
router.post('/', (req, res) => {

    const id = 'hafamily';
    const pw = 'ae5cf86f2a3a99a943b420c20d7df82f5e6fbed70349f7b1918e0b369bb0c4fd';

    const input_id = req.body.username;
    const input_pw = req.body.password;

    const secret = 'abcdefg';
    const hash = crypto.createHmac('sha256', secret)
        .update(input_pw)
        .digest('hex');
    console.log(hash);
    //로그인 성공시
    if (input_id == id && hash == pw) {
        req.session.userId = id;
        res.status(200).redirect("/");
    }    //로그인 실패시
    else {
        res.send('<script>alert("암호가 틀렸습니다.");' +
            'history.go(-1)</script>')
    }
});

module.exports = router;