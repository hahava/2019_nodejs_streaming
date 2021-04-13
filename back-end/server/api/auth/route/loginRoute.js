import express from 'express';
import * as loginController from '../controller/loginController';
import loginValidateMiddleware from '../middleware/loginValidateMiddleware';

const router = express.Router();

router.post('/register', loginValidateMiddleware, loginController.register);
router.post('/login', loginValidateMiddleware, loginController.doLogin);
router.post('/logout', loginController.doLogout);

export default router;
