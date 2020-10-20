import dbConnect from '../../../src/database';
import User from '../../../models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

dbConnect();

export default async (req, res) => {
  const { method, body, headers } = req;

  switch (method) {
    case 'GET':
      try {
        const { authorization } = headers;

        const splitToken = authorization.split(' ');

        if (splitToken[0] !== 'Bearer') {
          return res.status(400).json({
            success: false,
            msg: 'Invalid Token',
          });
        }

        const verifiedJWT = jwt.verify(splitToken[1], process.env.JWT_SECRET);

        const user = await User.findById(verifiedJWT.id);

        if (!user) {
          return res.status(400).json({
            success: false,
            msg: 'Invalid Token',
          });
        }

        res.status(200).json({
          success: true,
          data: user,
          token: authorization,
        });
      } catch (error) {
        res.status(400).json({
          success: false,
          msg: 'Invalid Token',
        });
      }
      break;

    case 'POST':
      try {
        const { email, password } = body;
        const isMatch = await User.findOne({ email: email });

        if (!isMatch) {
          return res.status(404).json({
            success: false,
            msg: 'Email or password is not valid',
          });
        }

        const VerifiedPassword = await bcrypt.compare(
          password,
          isMatch.password
        );

        if (!VerifiedPassword) {
          return res.status(400).json({
            success: false,
            msg: 'Email or password is not valid',
          });
        }

        const token = jwt.sign({ id: isMatch._id }, process.env.JWT_SECRET, {
          expiresIn: '1d',
        });

        res.status(200).json({
          success: true,
          data: isMatch,
          token: `Bearer ${token}`,
        });
      } catch (error) {
        res.status(400).json({
          success: false,
        });
      }
      break;
    default:
      res.status(400).json({
        success: false,
      });
      break;
  }
};
