import dbConnect from '../../../../src/database';
import Post from '../../../../models/Post';

dbConnect();

export default async (req, res) => {
  const { method, query } = req;

  switch (method) {
    case 'GET':
      try {
        // post slug id
        const { slug, pid } = query;

        const post = await Post.findOne({ _id: pid, slug: slug }).populate({
          path: 'author',
          select: '-password -posts',
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
