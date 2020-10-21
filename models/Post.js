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
  body: {
    type: String,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  created_date: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Post || mongoose.model('Post', PostSchema);
