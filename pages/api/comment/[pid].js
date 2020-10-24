import jwt from 'jsonwebtoken';
import dbConnect from '../../../src/database';
import Post from '../../../models/Post';
import Comment from '../../../models/Comment';

dbConnect();

export default async (req, res) => {
  const { method, query, headers, body } = req;

  switch (method) {
    case 'GET':
      try {
        const { pid } = query;

        const comments = await Comment.find({ post: pid })
          .populate({
            path: 'user',
            select: '-password -posts',
          })
          .sort({ created_date: -1 });

        res.status(200).json({
          success: true,
          data: comments,
        });
      } catch (error) {
        res.status(400).json({
          success: false,
        });
      }
      break;

    // Add Comment to Post Id
    case 'POST':
      try {
        const { authorization } = headers;
        const { pid } = query;

        if (!authorization) {
          return res.status(404).json({
            success: false,
            msg: 'Un-Authorization',
          });
        }

        const splitToken = authorization.split(' ');

        if (splitToken[0] !== 'Bearer') {
          return {
            success: false,
            msg: 'Invalid Token',
          };
        }

        const verifiedToken = jwt.verify(splitToken[1], process.env.JWT_SECRET);

        const commentData = {
          post: pid,
          user: verifiedToken.id,
          content: body.content,
        };

        const newComment = await Comment.create(commentData);

        await Post.findByIdAndUpdate(pid, {
          $push: {
            comments: newComment._id,
          },
        });

        res.status(200).json({
          success: true,
          data: newComment,
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
