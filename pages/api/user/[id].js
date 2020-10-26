import dbConnect from '../../../src/database';
import User from '../../../models/User';

dbConnect();

export default async (req, res) => {
  const { method, query } = req;

  switch (method) {
    case 'GET':
      try {
        const user = await User.findById(query.id).populate({
          path: 'posts',
          model: 'Post',
          populate: {
            path: 'comments',
            model: 'Comment',
          },
          populate: {
            path: 'author',
            model: 'User',
          },
        });

        if (!user) {
          return res.status(404).json({
            success: false,
          });
        }

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
    default:
      res.status(400).json({
        success: false,
      });
      break;
  }
};
