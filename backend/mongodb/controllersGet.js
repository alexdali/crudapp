import { User, Post, Comment } from './models';

/* eslint no-underscore-dangle: [1, { "allow": ["__id"] }] */

// Get single User by Id
const getUser = async (arg) => User.findById(arg)
  .then((result) => ({
    id: result._id,
    name: result.name,
    email: result.email,
  }))
  .catch((err) => console.error('Error db: ', err));

// Get single User by email
const getUserByArg = async (arg) => {
  const [prop, val] = arg;
  const filter = { [prop]: val };
  return User.find(filter)
    .then((result) => {
      if (result.length === 0) return null;
      const {
        _id: id, name, email, password,
      } = result[0];
      return {
        id, name, email, password,
      };
    })
    .catch((err) => console.error('Error db: ', err));
};

// Get all Users
const getUsers = async () => User.find()
  .then((result) => result.map((user) => ({
    id: user._id,
    name: user.name,
    email: user.email,
  })))
  .catch((err) => console.error('Error db: ', err));


// Get all posts
const getPosts = async () => Post.find()
  .then((result) => result.map((post) => ({
    id: post._id,
    title: post.title,
    userId: post.userId,
    content: post.content,
    createdDate: post.createdDate,
  })))
  .catch((err) => console.error('Error db: ', err));

// Get single Post
const getPost = async (arg) => Post.findById(arg)
  .then((result) => ({
    id: result._id,
    title: result.title,
    userId: result.userId,
    content: result.content,
    createdDate: result.createdDate,
  }))
  .catch((err) => console.error('Error db: ', err));

// Get single Comment
const getComment = async (arg) => Comment.findById(arg)
  .then((result) => ({
    id: result._id,
    postId: result.postId,
    userId: result.userId,
    content: result.content,
    createdDate: result.createdDate,
  }))
  .catch((err) => console.error('Error db: ', err));

// Get all posts by User
const getPostsByUser = async (arg) => Post.find({ userId: arg.userId })
  .then((result) => result.map((post) => ({
    id: post._id,
    title: post.title,
    userId: post.userId,
    content: post.content,
    createdDate: post.createdDate,
  })))
  .catch((err) => console.error('Error db: ', err));

// Get all comments by Post
const getCommentsByPost = async (arg) => {
  const { postId } = arg;
  return Comment.find({ postId })
    .then((result) => {
      if (result !== []) {
        return result.map((comment) => ({
          id: comment._id,
          userId: comment.userId,
          postId: comment.postId,
          content: comment.content,
          createdDate: comment.createdDate,
        }));
      } return result;
    })
    .catch((err) => console.error('Error db: ', err));
};

// Get all comments by User
const getCommentsByUser = async (arg) => Comment.find({ userId: arg.userId })
  .then((result) => result.map((comment) => ({
    id: comment._id,
    userId: comment.userId,
    postId: comment.postId,
    content: comment.content,
    createdDate: comment.createdDate,
  })))
  .catch((err) => console.error('Error db: ', err));

export {
  getUsers, getUser, getUserByArg, getPosts, getPost, getComment, getPostsByUser, getCommentsByPost, getCommentsByUser,
};
