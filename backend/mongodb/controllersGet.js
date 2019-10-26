import { User, Post, Comment } from './models';

/* eslint no-underscore-dangle: [1, { "allow": ["__id"] }] */

// Get single User
const getUser = async (arg) => {
  console.log(`c getUser arg: ${JSON.stringify(arg)}`);
  return User.findById(arg)
    .then((result) => ({
      id: result._id,
      firstName: result.firstName,
      lastName: result.lastName,
    }))
    .catch((err) => console.error('Error db: ', err));
};
// console.log(`c getUser reqUser: ${JSON.stringify(reqUser)}`); // return reqUser;

// Get all Users
const getUsers = async () => User.find()
  .then((result) => {
    console.log(`c getUsers find: ${JSON.stringify(result)}`);
    return result.map((user) => ({
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
    }));
  })
  .catch((err) => console.error('Error db: ', err));


// Get all posts
const getPosts = async () => Post.find()
  .then((result) => {
    console.log(`c getPosts find: ${JSON.stringify(result)}`);
    return result.map((post) => ({
      id: post._id,
      title: post.title,
      userId: post.userId,
      content: post.content,
      createdDate: post.createdDate,
    }));
    // const argPosts = posts.map((post) => {
    //   const newItem = { ...post };
    //   newItem.comments = Comment.find({ postId: newItem.id })
    //     .then((comments) => comments)
    //     .catch((err) => console.error('Error db: ', err));
    //   return newItem;
    // });
    // return argPosts;
  })
  .catch((err) => console.error('Error db: ', err));

// Get single Post
const getPost = async (arg) => Post.findById(arg)
  .then((result) => {
    console.log(`c getPost findById: ${JSON.stringify(result)}`);
    return ({
      id: result._id,
      title: result.title,
      userId: result.userId,
      content: result.content,
      createdDate: result.createdDate,
    });
  })
  .catch((err) => console.error('Error db: ', err));

// Get single Comment
const getComment = async (arg) => Comment.findById(arg)
  .then((result) => {
    console.log(`c getComment findById: ${JSON.stringify(result)}`);
    return ({
      id: result._id,
      postId: result.postId,
      userId: result.userId,
      content: result.content,
      createdDate: result.createdDate,
    });
  })
  .catch((err) => console.error('Error db: ', err));

// Get all posts by User
const getPostsByUser = async (arg) => Post.find({ userId: arg.userId })
  .then((result) => {
    console.log(`c getPostsByUser find: ${JSON.stringify(result)}`);
    return result.map((post) => ({
      id: post._id,
      title: post.title,
      userId: post.userId,
      content: post.content,
      createdDate: post.createdDate,
    }));
    // console.log(`c getPostsByUser newPost: ${JSON.stringify(newPost)}`);
    // return newPost;
  })
  .catch((err) => console.error('Error db: ', err));

// Get all comments
// const getComments = async () => {
//   await Comment.find()
//     .then((comments) => comments)
//     .catch((err) => console.error('Error db: ', err));
// };

// Get all comments by Post
const getCommentsByPost = async (arg) => {
  const { postId } = arg;
  return Comment.find({ postId })
    .then((result) => {
      console.log(`c getCommentsByPost find: ${JSON.stringify(result)}`);
      return result.map((comment) => ({
        id: comment._id,
        userId: comment.userId,
        postId: comment.postId,
        content: comment.content,
        createdDate: comment.createdDate,
      }));
    })
    .catch((err) => console.error('Error db: ', err));
};
// async function getCommentsByPost(arg) {
//   const { postId } = arg;
//   return Comment.find({ postId })
//     .then((result) => {
//       console.log(`c getCommentsByPost find: ${JSON.stringify(result)}`);
//       return result.map((comment) => ({
//         id: comment._id,
//         userId: comment.userId,
//         postId: comment.postId,
//         content: comment.content,
//         createdDate: comment.createdDate,
//       }));
//     })
//     .catch((err) => console.error('Error db: ', err));
// }


const getCommentsByUser = async (arg) => Comment.find({ userId: arg.userId })
  .then((result) => {
    console.log(`c getCommentsByUser find: ${JSON.stringify(result)}`);
    return result.map((comment) => ({
      id: comment._id,
      userId: comment.userId,
      postId: comment.postId,
      content: comment.content,
      createdDate: comment.createdDate,
    }));
  })
  .catch((err) => console.error('Error db: ', err));

export {
  getUsers, getUser, getPosts, getPost, getComment, getPostsByUser, getCommentsByPost, getCommentsByUser,
};
