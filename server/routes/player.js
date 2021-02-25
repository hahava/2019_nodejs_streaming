const express = require('express');
const router = express.Router();
const fs = require('fs');

router.get('/*', (req, res, next) => {
    if (req.session.userId != null) {
        next();
    } else {
        res.redirect('/login');
    }
});

router.get('/', (req, res) => {
    const type = req.query.type;
    const file = req.query.file;
    res.render('player', {
        "type": type, "file": file
    });
});

router.get('/watch/', (req, res) => {
    const type = req.query.type;
    const file = req.query.file;
    console.log(type);
    console.log(file);

    const path = './public/video/' + type + '/' + file;
    const stat = fs.statSync(path);
    const fileSize = stat.size;
    const range = req.headers.range;


    if (range) {
        const parts = range.replace(/bytes=/, "").split("-")
        const start = parseInt(parts[0], 10)
        const end = parts[1]
            ? parseInt(parts[1], 10)
            : fileSize - 1

        const chunksize = (end - start) + 1
        const file = fs.createReadStream(path, { start, end })
        const head = {
            'Content-Range': `bytes ${start}-${end}/${fileSize}`,
            'Accept-Ranges': 'bytes',
            'Content-Length': chunksize,
            'Content-Type': 'video/mp4',
        }

        res.writeHead(206, head)
        file.pipe(res)
    } else {
        const head = {
            'Content-Length': fileSize,
            'Content-Type': 'video/mp4',
        }
        res.writeHead(200, head)
        fs.createReadStream(path).pipe(res)
    }
});

module.exports = router;