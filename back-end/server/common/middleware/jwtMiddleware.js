import jwt from 'jsonwebtoken';

const jwtMiddleware = (req, res, next) => {
  const token = req.cookies['login_token'];

  if (!token) {
    return next();
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  req['user'] = {
    userId: decoded.userId,
  };

  return next();
};

export default jwtMiddleware;
