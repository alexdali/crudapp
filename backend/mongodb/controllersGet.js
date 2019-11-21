import { User, Post, Comment } from './models';

/* eslint no-underscore-dangle: [1, { "allow": ["__id"] }] */

// Get single User by Id
const getUser = async (arg) => {
  console.log(`c getUser arg: ${JSON.stringify(arg)}`);
  return User.findById(arg)
    .then((result) =>
      // if (result.length === 0) return null;
      ({
        id: result._id,
        name: result.name,
        email: result.email,
      }))
    .catch((err) => console.error('Error db: ', err));
};
// console.log(`c getUser reqUser: ${JSON.stringify(reqUser)}`); // return reqUser;

// Get single User by email
const getUserByArg = async (arg) => {
  // console.log(`c getUser arg: ${JSON.stringify(arg)}`);
  console.log(`c getUserByArg arg: ${arg}`);
  // const filter = {};
  // const prop = arg[0];
  const [prop, val] = arg;
  // const filter = { [prop]: arg[1] };
  const filter = { [prop]: val };
  console.log(`c getUserByArg filter: ${JSON.stringify(filter)}`);
  return User.find(filter)
    .then((result) => {
      console.log(`c getUserByArg result: ${JSON.stringify(result)}`);
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
  .then((result) => {
    console.log(`c getUsers find: ${JSON.stringify(result)}`);
    return result.map((user) => ({
      id: user._id,
      name: user.name,
      email: user.email,
    }));
  })
  .catch((err) => console.error('Error db: ', err));


// Get all posts
const getPosts = async () => Post.find()
  .then((result) => 
    //console.log(`c getPosts find: ${JSON.stringify(result)}`);
     result.map((post) => ({
      id: post._id,
      title: post.title,
      userId: post.userId,
      content: post.content,
      createdDate: post.createdDate,
    }))
    // const argPosts = posts.map((post) => {
    //   const newItem = { ...post };
    //   newItem.comments = Comment.find({ postId: newItem.id })
    //     .then((comments) => comments)
    //     .catch((err) => console.error('Error db: ', err));
    //   return newItem;
    // });
    // return argPosts;
  )
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
  .then((result) => 
    //console.log(`c getPostsByUser find: ${JSON.stringify(result)}`);
     result.map((post) => ({
      id: post._id,
      title: post.title,
      userId: post.userId,
      content: post.content,
      createdDate: post.createdDate,
    }))
    // console.log(`c getPostsByUser newPost: ${JSON.stringify(newPost)}`);
    // return newPost;
  )
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
      if (result !== []) {
        return result.map((comment) => ({
          id: comment._id,
          userId: comment.userId,
          postId: comment.postId,
          content: comment.content,
          createdDate: comment.createdDate,
        }));
      }  return result ;
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
  getUsers, getUser, getUserByArg, getPosts, getPost, getComment, getPostsByUser, getCommentsByPost, getCommentsByUser,
};
