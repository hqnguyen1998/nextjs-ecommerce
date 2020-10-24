import jwt from 'jsonwebtoken';

export const verifiedToken = (token) => {
  const splitToken = token.split(' ');

  if (splitToken[0] !== 'Bearer') {
    return {
      success: false,
      msg: 'Invalid Token',
    };
  }

  const verifiedToken = jwt.verify(token, process.env.JWT_SECRET);

  if (!verifiedToken) {
    return {
      success: false,
      msg: 'Invalid Token',
    };
  }

  return verifiedToken;
};
