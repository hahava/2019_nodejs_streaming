import { StatusCodes } from 'http-status-codes';
import commonUtil from '../../../common/util/commonUtil';
import ErrorMessage from '../../../common/util/errorMessage';

const loginValidateMiddleware = (req, res, next) => {
  const { userId, password } = req.body;

  if (commonUtil.isEmpty(userId)) {
    res.status(StatusCodes.UNAUTHORIZED)
       .send(ErrorMessage.ID_NOT_NULL);
    return;
  }

  if (commonUtil.isEmpty(password)) {
    res.status(StatusCodes.UNAUTHORIZED)
       .send(ErrorMessage.PASSWORD_NOT_NULL);
    return;
  }

  next();
};

export default loginValidateMiddleware;
