import { User, Post, Comment } from './models';

// Get all Users
const getUsers = async () => {
  const users = await User.find();
  return users;
};

// Get single User
const getUser = async (req) => {
  const { id } = req.params;
  const user = await User.find({ userId: id });
  return user;
};

// Get all posts
const getPosts = async () => {
  const posts = await Post.find();
  return posts;
};

// Get single Post
const getPost = async (req) => {
  const { id } = req.params;
  const post = await Post.find({ postId: id });
  return post;
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

export {
  getUsers, getUser, getPosts, getPost, getPostsByUser, getCommentsByPost,
};
