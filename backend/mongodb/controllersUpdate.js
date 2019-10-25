import { User, Post, Comment } from './models';

/* eslint no-underscore-dangle: [1, { "allow": ["__id"] }] */
// Create User
const createUser = async (arg) => {
  console.log(`m createUser req: ${JSON.stringify(arg)}`);
  const { id, firstName, lastName } = arg;
  const user = new User({
    _id: id, firstName, lastName,
  });
  return user.save()
    .then((result) => {
      console.log(`m createUser insertOne: ${JSON.stringify(result)}`);
      const newUser = {
        id: result._id,
        firstName: result.firstName,
        lastName: result.lastName,
      };
      // const newUser = { ...result };
      // newUser.id = newUser._id;
      // delete newUser._id;
      console.log(`m createUser newUser: ${JSON.stringify(newUser)}`);
      return newUser;
    })
    .catch((err) => console.error('Error db: ', err));
};

// Create Post
const createPost = async (req) => {
  const {
    id, title, userId, content, createdDate,
  } = req.params;
  await Post.insertOne({
    _id: id, title, userId, content, createdDate,
  })
    .then((post) => post)
    .catch((err) => console.error('Error db: ', err));
};

// Create Comment
const createComment = async (req) => {
  const {
    id, userId, postId, content, createdDate,
  } = req.params;
  await Comment.insertOne({
    _id: id, userId, postId, content, createdDate,
  })
    .then((comment) => comment)
    .catch((err) => console.error('Error db: ', err));
};

export {
  createUser, createPost, createComment,
};
