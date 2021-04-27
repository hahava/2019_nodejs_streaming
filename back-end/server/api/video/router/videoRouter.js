import express from 'express';
import * as videoController from '../controller/videoController';

const router = express.Router();

router.get('/watch/:type/:fileName', videoController.watch);
router.get('/:type', videoController.getFileNames);

export default router;
