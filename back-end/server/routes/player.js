import express from 'express';
import fs from 'fs';
import { StatusCodes } from 'http-status-codes';

const router = express.Router();

const getVideoRange = (rangeHeader, fileSize) => {
  if (!rangeHeader) {
    return null;
  }

  const [startText, endText] = rangeHeader.replace('bytes=', '').split('-');
  const start = Number.parseInt(startText, 10);
  const end = endText ? Number.parseInt(endText, 10) : fileSize - 1;

  if (Number.isNaN(start) || Number.isNaN(end) || start > end || end >= fileSize) {
    return null;
  }

  return { start, end };
};

router.get('/watch/', async (req, res) => {
  const { type } = req.query;
  const { file } = req.query;

  if (!type || !file) {
    res.status(StatusCodes.BAD_REQUEST).send();
    return;
  }

  const targetPath = `./public/video/${type}/${file}`;

  try {
    const stat = await fs.promises.stat(targetPath);
    const range = getVideoRange(req.headers.range, stat.size);

    if (!range && req.headers.range) {
      res.writeHead(StatusCodes.REQUESTED_RANGE_NOT_SATISFIABLE, {
        'Content-Range': `bytes */${stat.size}`,
      });
      res.end();
      return;
    }

    if (range) {
      const chunkSize = (range.end - range.start) + 1;
      const stream = fs.createReadStream(targetPath, {
        start: range.start,
        end: range.end,
      });
      const head = {
        'Content-Range': `bytes ${range.start}-${range.end}/${stat.size}`,
        'Accept-Ranges': 'bytes',
        'Content-Length': chunkSize,
        'Content-Type': 'video/mp4',
      };

      res.writeHead(StatusCodes.PARTIAL_CONTENT, head);
      stream.pipe(res);
      return;
    }

    const head = {
      'Content-Length': stat.size,
      'Content-Type': 'video/mp4',
    };
    res.writeHead(StatusCodes.OK, head);
    fs.createReadStream(targetPath).pipe(res);
  } catch (error) {
    res.status(StatusCodes.NOT_FOUND).send();
  }
});

export default router;
