var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    if (req.session.userId == null) {
        res.redirect('/login')
    } else {
        res.render('index');
    }
});
module.exports = router;
