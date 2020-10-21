import dbConnect from '../../../src/database';
import Post from '../../../models/Post';

dbConnect();

export default async (req, res) => {
  const { method, query } = req;

  switch (method) {
    case 'GET':
      try {
        // post slug id
        const { slug } = query;

        const post = await Post.findOne({ slug: slug }).populate('author', {
          email: 1,
          first_name: 1,
          last_name: 1,
          avatar: 1,
        });

        if (!post) {
          return res.status(404).json({
            success: false,
            msg: 'Post does not found',
          });
        }

        res.status(200).json({
          success: true,
          data: post,
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
