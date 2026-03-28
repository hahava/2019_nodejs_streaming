import express from 'express';
import { StatusCodes } from 'http-status-codes';
import * as loginController from '../controller/loginController';
import loginValidateMiddleware from '../middleware/loginValidateMiddleware';

const router = express.Router();
const loginAttemptStore = new Map();
const LOGIN_LIMIT_WINDOW_MS = 60 * 1000;
const MAX_LOGIN_ATTEMPTS = 5;

const getLoginAttemptKey = (req) => {
  const ip = req.ip || req.connection?.remoteAddress || 'unknown';
  const userId = req.body?.userId || 'unknown';
  return `${ip}:${userId}`;
};

const loginRateLimitMiddleware = (req, res, next) => {
  const now = Date.now();
  const key = getLoginAttemptKey(req);
  const current = loginAttemptStore.get(key);

  if (!current || now > current.resetAt) {
    loginAttemptStore.set(key, { count: 1, resetAt: now + LOGIN_LIMIT_WINDOW_MS });
    next();
    return;
  }

  if (current.count >= MAX_LOGIN_ATTEMPTS) {
    res.status(StatusCodes.TOO_MANY_REQUESTS).send('too many login attempts');
    return;
  }

  current.count += 1;
  loginAttemptStore.set(key, current);
  next();
};

router.post('/register', loginValidateMiddleware, loginController.register);
router.post('/login', loginRateLimitMiddleware, loginValidateMiddleware, loginController.doLogin);
router.post('/logout', loginController.doLogout);

export default router;
