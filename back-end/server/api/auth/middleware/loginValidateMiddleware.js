import { StatusCodes } from 'http-status-codes';
import commonUtil from '../../../common/util/commonUtil';
import ErrorMessage from '../../../common/util/errorMessage';

const sendValidationError = (res, message) => res.status(StatusCodes.BAD_REQUEST)
  .send(message);

const loginValidateMiddleware = (req, res, next) => {
  const { userId, password } = req.body || {};

  if (commonUtil.isEmpty(userId)) {
    sendValidationError(res, ErrorMessage.ID_NOT_NULL);
    return;
  }

  if (commonUtil.isEmpty(password)) {
    sendValidationError(res, ErrorMessage.PASSWORD_NOT_NULL);
    return;
  }

  next();
};

export default loginValidateMiddleware;
