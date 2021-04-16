import { StatusCodes } from 'http-status-codes/build/es';
import fs from 'fs';

export const watch = (req, res) => {
  console.log('hello world');
  res.send();
  const { type } = req.query;
  const { file } = req.query;

  const path = `./public/video/${type}/${file}`;

  // const stat = fs.statSync(path);
  // const fileSize = stat.size;
  // const { range } = req.headers;
  //
  // if (range) {
  //   const parts = range.replace(/bytes=/, '')
  //     .split('-');
  //   const start = parseInt(parts[0], 10);
  //   const end = parts[1]
  //     ? parseInt(parts[1], 10)
  //     : fileSize - 1;
  //
  //   const chunksize = (end - start) + 1;
  //   const file = fs.createReadStream(path, {
  //     start,
  //     end,
  //   });
  //   const head = {
  //     'Content-Range': `bytes ${start}-${end}/${fileSize}`,
  //     'Accept-Ranges': 'bytes',
  //     'Content-Length': chunksize,
  //     'Content-Type': 'video/mp4',
  //   };
  //
  //   res.writeHead(206, head);
  //   file.pipe(res);
  // } else {
  //   const head = {
  //     'Content-Length': fileSize,
  //     'Content-Type': 'video/mp4',
  //   };
  //   res.writeHead(200, head);
  //   fs.createReadStream(path)
  //     .pipe(res);
  // }
};

export const getFileNames = async (req, res) => {
  const { type } = req.params;

  console.log("??")

  try {
    const files = fs.readdirSync(`../videos/${type}`);
    res.status(StatusCodes.OK)
      .send(files);
  } catch (e) {
    res.status(StatusCodes.BAD_REQUEST)
      .send();
  }
};
