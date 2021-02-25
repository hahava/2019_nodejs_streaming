import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
    req.session.destroy();
    res.status(200).send(
        `
            <Script>
                alert('로그아웃 되었습니다.'); location.href='/'
            </Script>
        `
    );
});

export default router;