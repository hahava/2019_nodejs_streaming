import { StatusCodes } from 'http-status-codes';
import UserAuth from '../model/userAuth';

const isValidateRequest = (id, password) => (
  id !== null && id !== undefined && password !== null && password !== undefined
);

export const register = async (req, res) => {
  const { userId, password } = req.body;

  if (!isValidateRequest(userId, password)) {
    res.status(StatusCodes.BAD_REQUEST)
       .send('id or password must not be null');
    return;
  }

  const result = await UserAuth.findByUsername(userId);
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

export const doLogin = async (req, res) => {


  res.send('hello world');
};

export const doLogout = async (req, res) => {
  res.send('logout');
};
