import { User, Post, Comment } from './models';

/* eslint no-underscore-dangle: [1, { "allow": ["__id"] }] */
// Create User
const createUser = async (arg) => {
  console.log(`c createUser arg: ${JSON.stringify(arg)}`);
  const { id, firstName, lastName } = arg;
  const user = new User({
    _id: id, firstName, lastName,
  });
  return user.save()
    .then((result) => {
      console.log(`c createUser SaveOne: ${JSON.stringify(result)}`);
      const newUser = {
        id: result._id,
        firstName: result.firstName,
        lastName: result.lastName,
        // posts: [],
      };
      console.log(`c createUser newUser: ${JSON.stringify(newUser)}`);
      return newUser;
    })
    .catch((err) => console.error('Error db: ', err));
};

// Create Post
const createPost = async (arg) => {
  const {
    id, title, userId, content, createdDate,
  } = arg;
  const post = new Post({
    _id: id, title, userId, content, createdDate,
  });
  return post.save()
    .then((result) => {
      console.log(`c createUser SaveOne: ${JSON.stringify(result)}`);
      const newPost = {
        id: result._id,
        title: result.title,
        userId: result.userId,
        content: result.content,
        createdDate: result.createdDate,
      };
      console.log(`c createPost newPost: ${JSON.stringify(newPost)}`);
      return newPost;
    })
    .catch((err) => console.error('Error db: ', err));
};

// Create Comment
const createComment = async (arg) => {
  console.log(`c createComment arg: ${JSON.stringify(arg)}`);
  // const {
  //   id, userId, postId, content, createdDate,
  // } = arg;
  // const comment = new Comment({
  //   _id: id, userId, postId, content, createdDate,
  // });
  const comment = new Comment({
    _id: arg.id, ...arg,
  });
  console.log(`c createComment comment: ${JSON.stringify(comment)}`);
  return comment.save()
    .then((result) => {
      console.log(`c createComment SaveOne: ${JSON.stringify(result)}`);
      const newComment = {
        id: result._id,
        userId: result.userId,
        postId: result.postId,
        content: result.content,
        createdDate: result.createdDate,
      };
      console.log(`c createComment newComment: ${JSON.stringify(newComment)}`);
      return newComment;
    })
    .catch((err) => console.error('Error db: ', err));
};

export {
  createUser, createPost, createComment,
};
