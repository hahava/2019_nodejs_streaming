const express = require('express');
const router = express.Router();

router.get('/', function (req, res) {
    req.session.destroy();
    res.status(200).send("<Script>alert('로그아웃 되었습니다.'); location.href='/'</Script>");
});

module.exports = router;
