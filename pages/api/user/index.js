import User from '../../../models/User';
import dbConnect from '../../../src/database';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import gravatar from 'gravatar';

dbConnect();

export default async (req, res) => {
  const { method, body, query } = req;

  switch (method) {
    case 'GET':
      try {
        const user = await User.findById(query.id).select('-password');

        res.status(200).json({
          success: true,
          data: user,
        });
      } catch (error) {
        res.status(400).json({
          success: false,
        });
      }
      break;
    case 'POST':
      const { email, password, first_name, last_name } = body;
      try {
        const isMatchUser = await User.findOne({ email: email });

        if (isMatchUser) {
          return res.status(400).json({
            success: false,
            msg: 'Email is already existed',
          });
        }
        const avatar = gravatar.url(
          email,
          { s: '100', r: 'x', d: 'retro' },
          true
        );

        const encrypted = await bcrypt.hash(password, 10);

        const newData = {
          email,
          password: encrypted,
          avatar,
          first_name,
          last_name,
        };

        const user = await User.create(newData);

        // Token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
          expiresIn: '1d',
        });

        res.status(200).json({
          success: true,
          data: user,
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
