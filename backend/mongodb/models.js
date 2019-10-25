import mongoose from 'mongoose';

const { ObjectId } = mongoose.Schema.Types;

const User = mongoose.model('User', new mongoose.Schema({
  _id: ObjectId,
  firstName: String,
  lastName: String,
}));

const Post = mongoose.model('Post', new mongoose.Schema({
  _id: ObjectId,
  title: String,
  content: String,
  userId: ObjectId,
  created_date: { type: Date, default: Date.now },
}));

const Comment = mongoose.model('Comment', new mongoose.Schema({
  _id: ObjectId,
  userId: Number,
  content: String,
  postId: ObjectId,
  created_date: { type: Date, default: Date.now },
}));

export { User, Post, Comment };
