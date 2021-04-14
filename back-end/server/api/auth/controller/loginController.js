import { StatusCodes } from 'http-status-codes';
import UserAuth from '../model/userAuth';
import ErrorMessage from '../../../common/util/errorMessage';

/*
* {
*   userId : "user"
*   password : "1234"
* }
* */
export const register = async (req, res) => {
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
};

/*
* {
*   userId : "user"
*   password : "1234"
* }
* */
export const doLogin = async (req, res) => {
  const { userId, password } = req.body;

  const user = await UserAuth.findByUserId(userId);
  if (!user) {
    res.status(StatusCodes.UNAUTHORIZED)
       .send(ErrorMessage.LOGIN_FAIL);
    return;
  }

  const valid = await user.checkPassword(password);
  if (!valid) {
    res.status(StatusCodes.UNAUTHORIZED)
       .send();
    return;
  }

  const token = user.generateToken();
  res.cookie('login_token', token, {
    maxAge: 1000 * 60 * 60 * 24 * 7, // 7days
    httpOnly: true,
  })
    .status(StatusCodes.OK)
    .send();
};

export const doLogout = async (req, res) => {
  res.clearCookie('login_token')
     .status(StatusCodes.NO_CONTENT)
     .send();
};
