import nc from 'next-connect';
import jwt from 'jsonwebtoken';

const handler = nc();

const middleware = (req, res, next) => {
  const { headers } = req;

  const { authorization } = headers;

  if (!authorization) {
    return res.status(404).json({
      success: false,
      msg: 'No-Authorization',
    });
  }

  // Verify If Token is valid
  const token = authorization.split(' ');

  if (token[0] !== 'Bearer') {
    return res.status(400).json({
      success: false,
      msg: 'Invalid Token',
    });
  }

  const verified = jwt.verify(token[1], process.env.JWT_SECRET);

  if (!verified) {
    return res.status(400).json({
      success: false,
      msg: 'Invalid Token',
    });
  }

  // User Id
  req.user = verified;

  next();
};

handler.use(middleware);

export default handler;
