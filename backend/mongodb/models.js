import mongoose from 'mongoose';

// const { ObjectId } = mongoose.Schema.Types;

const User = mongoose.model('User', new mongoose.Schema({
  _id: String,
  name: String,
  email: String,
  password: String,
}));

const Post = mongoose.model('Post', new mongoose.Schema({
  _id: String,
  title: String,
  content: String,
  userId: String,
  createdDate: { type: Date, default: Date.now },
}));

const Comment = mongoose.model('Comment', new mongoose.Schema({
  _id: String,
  userId: String,
  content: String,
  postId: String,
  createdDate: { type: Date, default: Date.now },
}));

export { User, Post, Comment };
