import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: {
    type: String,
    unique: true,
    trim: true,
    required: true,
  },
  first_name: {
    type: String,
    trim: true,
    lowercase: true,
    uppercase: true,
    minlength: 1,
  },
  last_name: {
    type: String,
    trim: true,
    lowercase: true,
    uppercase: true,
    minlength: 1,
  },
  avatar: {
    type: String,
  },
  password: {
    type: String,
    required: true,
  },
  summary: {
    type: String,
  },
  location: {
    type: String,
  },
  showEmail: {
    type: Boolean,
    default: false,
  },
  website: {
    type: String,
  },
  links: {
    facebook: {
      type: String,
      default: '',
    },
    instagram: {
      type: String,
      default: '',
    },
    linkedIn: {
      type: String,
      default: '',
    },
    youtube: {
      type: String,
      default: '',
    },
    stackOverFlow: {
      type: String,
      default: '',
    },
    medium: {
      type: String,
      default: '',
    },
    github: {
      type: String,
      default: '',
    },
    twitch: {
      type: String,
      default: '',
    },
  },
  posts: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Post',
    },
  ],
  created_date: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.User || mongoose.model('User', UserSchema);
