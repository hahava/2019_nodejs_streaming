const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
    console.log("index")
    if (req.session.userId == null) {
        res.redirect('/login')
    } else {
        res.render('index');
    }
});
module.exports = router;
