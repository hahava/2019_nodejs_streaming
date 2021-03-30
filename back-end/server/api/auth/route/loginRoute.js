import express from 'express';
import * as loginController from '../controller/loginController';

const router = express.Router();

router.post('/register', loginController.register);
router.post('/login', loginController.doLogin);
router.post('/logout', loginController.doLogout);

export default router;
