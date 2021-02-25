const express = require('express');
const router = express.Router();
const fs = require('fs');


// Video

router.get('/*', (req, res, next) => {
    if (req.session.userId == null) {
        res.redirect('/login');
    } else {
        next();
    }
});

router.get('/:type', (req, res) => {
    var type = req.params.type;
    var fileList = fs.readdirSync('./public/video/' + type);
    res.render('video', { 'list': fileList, 'type': type });
});

module.exports = router;