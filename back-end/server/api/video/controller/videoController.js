import { StatusCodes } from 'http-status-codes';
import fs from 'fs';
import path from 'path';

const VIDEO_ROOT_DIR = path.resolve(process.cwd(), '../videos');

const getVideoPath = (type, fileName) => path.join(VIDEO_ROOT_DIR, type, fileName);

const getRange = (rangeHeader, fileSize) => {
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

const sendWholeFile = (res, targetPath, fileSize) => {
  res.writeHead(StatusCodes.OK, {
    'Content-Length': fileSize,
    'Content-Type': 'video/mp4',
  });
  fs.createReadStream(targetPath).pipe(res);
};

const sendPartialFile = (res, targetPath, fileSize, range) => {
  const { start, end } = range;
  const chunkSize = (end - start) + 1;
  const fileStream = fs.createReadStream(targetPath, { start, end });

  res.writeHead(StatusCodes.PARTIAL_CONTENT, {
    'Content-Range': `bytes ${start}-${end}/${fileSize}`,
    'Accept-Ranges': 'bytes',
    'Content-Length': chunkSize,
    'Content-Type': 'video/mp4',
  });
  fileStream.pipe(res);
};

export const watch = async (req, res) => {
  const { type, fileName } = req.params;
  const targetPath = getVideoPath(type, fileName);

  try {
    const stat = await fs.promises.stat(targetPath);
    const range = getRange(req.headers.range, stat.size);

    if (!range && req.headers.range) {
      res.writeHead(StatusCodes.REQUESTED_RANGE_NOT_SATISFIABLE, {
        'Content-Range': `bytes */${stat.size}`,
      });
      res.end();
      return;
    }

    if (range) {
      sendPartialFile(res, targetPath, stat.size, range);
      return;
    }

    sendWholeFile(res, targetPath, stat.size);
  } catch (error) {
    res.status(StatusCodes.NOT_FOUND).send();
  }
};

export const getFileNames = async (req, res) => {
  const { type } = req.params;
  const directoryPath = getVideoPath(type, '');

  try {
    const files = await fs.promises.readdir(directoryPath);
    res.status(StatusCodes.OK).send(files);
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).send();
  }
};
