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
  userId: ObjectId,
}));

const Comment = mongoose.model('Comment', new mongoose.Schema({
  _id: ObjectId,
  userId: Number,
  postId: ObjectId,
}));

export { User, Post, Comment };
