import { User, Post, Comment } from './models';

// Get all Users
const getUsers = async () => {
  const users = await User.find();
  return users;
};

// Get all posts
const getPosts = async () => {
  const posts = await Post.find();
  return posts;
};

// Get all posts by User
const getPostsByUser = async (req) => {
  const { id } = req.params;
  const posts = await Post.find({ userId: id });
  return posts;
};

// Get all comments by Post
const getCommentsByPost = async (req) => {
  const { id } = req.params;
  const comments = await Comment.find({ postId: id });
  return comments;
};
