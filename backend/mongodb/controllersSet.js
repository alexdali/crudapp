import bcrypt from 'bcrypt';
import { User, Post, Comment } from './models';

/* eslint no-underscore-dangle: [1, { "allow": ["__id"] }] */
// Create User
const createUser = async (arg) => {
  console.log(`c createUser arg: ${JSON.stringify(arg)}`);
  const {
    id, name, email, password,
  } = arg;

  // check if the user exists
  const nameExist = await User.find({ name });
  if (nameExist.length !== 0) {
    throw new Error('Пользователь с таким логином уже существует!');
  }
  const emailExist = await User.find({ email });
  if (emailExist.length !== 0) {
    throw new Error('Пользователь с таким email уже существует!');
  }

  const hashPassword = await bcrypt.hash(password, 10);
  const user = new User({
    _id: id, name, email, password: hashPassword,
  });
  console.log(`c createUser user: ${JSON.stringify(user)}`);
  return user.save()
    .then((result) => {
      console.log(`c createUser SaveOne: ${JSON.stringify(result)}`);
      const newUser = {
        id: result._id,
        name: result.name,
        email: result.email,
      };
      console.log(`c createUser newUser: ${JSON.stringify(newUser)}`);
      return newUser;
    })
    .catch((err) => console.error('Error db: ', err));
};

// Delete User
const deleteUser = async (arg) => {
  console.log(`c deleteUser arg: ${JSON.stringify(arg)}`);
  return User.findByIdAndRemove(arg)
    .then(async (result) => {
      console.log(`c deleteUser findByIdAndRemove: ${JSON.stringify(result)}`);
      // delete all posts by the userId
      if (result !== null) {
        const { _id } = result;
        const delPostsByUser = await Post.deleteMany({ userId: _id });
        console.log(`c deleteUser delPostsByUser: ${JSON.stringify(delPostsByUser)}`);

        // delete all comments by the userId
        const delCommentsByUser = await Comment.deleteMany({ userId: _id });
        console.log(`c deleteUser delCommentsByUser: ${JSON.stringify(delCommentsByUser)}`);
      }
      return result;
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

// Delete Post
const deletePost = async (arg) => {
  console.log(`c deletePost arg: ${JSON.stringify(arg)}`);
  const { userId, postId } = arg;
  return Post.findOneAndDelete({ userId, _id: postId })
    .then(async (result) => {
      console.log(`c deletePost findOneAndDelete: ${JSON.stringify(result)}`);
      // delete all comments by the postId
      if (result !== null) {
        const delCommentByPost = await Comment.deleteMany({ postId: result._id });
        console.log(`c deletePost delCommentByPost: ${JSON.stringify(delCommentByPost)}`);
      }
      return result;
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

// Delete Comment
const deleteComment = async (arg) => {
  console.log(`c deleteComment arg: ${JSON.stringify(arg)}`);
  const { id, userId } = arg;
  return Comment.findOneAndDelete({ userId, _id: id })
    .then((result) => {
      console.log(`c deleteComment findByIdAndRemove: ${JSON.stringify(result)}`);
      return result;
    })
    .catch((err) => console.error('Error db: ', err));
};


export {
  createUser, deleteUser, createPost, deletePost, createComment, deleteComment,
};
