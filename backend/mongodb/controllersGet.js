import { User, Post, Comment } from './models';

// Get all Users
const getUsers = async () => {
  // const users = await User.find();
  // return users;
  await User.find()
    .then((users) => users)
    .catch((err) => console.error('Error db: ', err));
};

// Get single User
const getUser = async (req) => {
  const { id } = req.params;
  // const user = await User.find({ _id: id });
  // return user;
  await User.findById(id)
    .then((user) => user)
    .catch((err) => console.error('Error db: ', err));
};

// Get all posts
const getPosts = async () => {
  // const posts = await Post.find();
  // return posts;
  await Post.find()
    .then((posts) => {
      const reqPosts = posts.map((post) => {
        const newItem = { ...post };
        newItem.comments = Comment.find({ postId: newItem.id })
          .then((comments) => comments)
          .catch((err) => console.error('Error db: ', err));
        return newItem;
      });
      return reqPosts;
    })
    .catch((err) => console.error('Error db: ', err));
};

// Get single Post
const getPost = async (req) => {
  const { id } = req.params;
  // const post = await Post.find({ _id: id });
  // return post;
  await Post.findById(id)
    .then((post) => {
      const reqPost = { ...post };
      reqPost.comments = Comment.find({ postId: post.id })
        .then((comments) => comments)
        .catch((err) => console.error('Error db: ', err));
      return reqPost;
    })
    .catch((err) => console.error('Error db: ', err));
};

// Get all posts by User
const getPostsByUser = async (req) => {
  const { userId } = req.params;
  // const posts = await Post.find({ userId: id });
  // return posts;
  await Post.find({ userId })
    .then((posts) => posts)
    .catch((err) => console.error('Error db: ', err));
};

// Get all comments
const getComments = async () => {
  await Comment.find()
    .then((comments) => comments)
    .catch((err) => console.error('Error db: ', err));
};

// Get all comments by Post
const getCommentsByPost = async (req) => {
  const { postId } = req.params;
  // const comments = await Comment.find({ postId: id });
  // return comments;
  await Comment.find({ postId })
    .then((comments) => comments)
    .catch((err) => console.error('Error db: ', err));
};

export {
  getUsers, getUser, getPosts, getPost, getPostsByUser, getComments, getCommentsByPost,
};
