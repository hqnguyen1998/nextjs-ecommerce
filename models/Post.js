import mongoose from 'mongoose';
import slug from 'mongoose-slug-generator';

mongoose.plugin(slug);

const Schema = mongoose.Schema;

const PostSchema = new Schema({
  title: {
    type: String,
    minlength: 1,
    trim: true,
  },
  description: {
    type: String,
    minlength: 1,
    trim: true,
  },
  slug: { type: String, slug: 'title', unique: true },
  image: {
    type: String,
    minlength: 1,
    trim: true,
  },
  tags: [
    {
      type: String,
    },
  ],
  body: {
    type: String,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  likes: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  comments: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Comment',
    },
  ],
  created_date: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Post || mongoose.model('Post', PostSchema);
