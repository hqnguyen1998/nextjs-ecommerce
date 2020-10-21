import dbConnect from '../../../src/database';
import Post from '../../../models/Post';
import User from '../../../models/User';
import jwt from 'jsonwebtoken';

dbConnect();

export default async (req, res) => {
  const { method, body, headers } = req;

  switch (method) {
    //   Get All Posts
    case 'GET':
      try {
        const posts = await Post.find({});

        res.status(200).json({
          success: true,
          data: posts,
        });
      } catch (error) {
        res.status(400).json({
          success: false,
        });
      }
      break;

    //   Create new Post
    case 'POST':
      try {
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
        const { id } = verified;

        // Create New post
        const post = await Post.create({
          author: id,
          ...body,
        });

        // Add Post to user
        await User.findByIdAndUpdate(id, { $push: { posts: post._id } });

        // Return data
        res.status(200).json({
          success: true,
          msg: 'Create post success',
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
