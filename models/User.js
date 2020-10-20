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
    minlength: 1,
  },
  last_name: {
    type: String,
    trim: true,
    lowercase: true,
    minlength: 1,
  },
  avatar: {
    type: String,
  },
  password: {
    type: String,
    required: true,
  },
  created_date: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.User || mongoose.model('User', UserSchema);
