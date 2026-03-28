import { StatusCodes } from 'http-status-codes';
import UserAuth from '../model/userAuth.js';
import ErrorMessage from '../../../common/util/errorMessage.js';

const LOGIN_TOKEN_COOKIE = 'login_token';
const ONE_WEEK_IN_MS = 1000 * 60 * 60 * 24 * 7;

const sendUnauthorized = (res) => res.status(StatusCodes.UNAUTHORIZED)
  .send(ErrorMessage.LOGIN_FAIL);

/*
* {
*   userId : "user"
*   password : "1234"
* }
* */
export const register = async (req, res) => {
  try {
    const { userId, password } = req.body;

    const result = await UserAuth.findByUserId(userId);
    if (result) {
      res.status(StatusCodes.CONFLICT)
        .send('id conflict');
      return;
    }

    const user = new UserAuth({
      userId,
    });

    await user.setPassword(password);
    await user.save();

    res.status(StatusCodes.OK).send();
  } catch (error) {
    console.error('[auth.register] failed', error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send();
  }
};

/*
* {
*   userId : "user"
*   password : "1234"
* }
* */
export const doLogin = async (req, res) => {
  try {
    const { userId, password } = req.body;

    const user = await UserAuth.findByUserId(userId);
    if (!user) {
      sendUnauthorized(res);
      return;
    }

    const valid = await user.checkPassword(password);
    if (!valid) {
      sendUnauthorized(res);
      return;
    }

    const token = user.generateToken();
    res.cookie(LOGIN_TOKEN_COOKIE, token, {
      maxAge: ONE_WEEK_IN_MS, // 7days
      httpOnly: true,
    })
      .status(StatusCodes.OK)
      .send();
  } catch (error) {
    console.error('[auth.doLogin] failed', error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send();
  }
};

export const doLogout = async (req, res) => {
  res.clearCookie(LOGIN_TOKEN_COOKIE)
    .status(StatusCodes.NO_CONTENT)
    .send();
};
