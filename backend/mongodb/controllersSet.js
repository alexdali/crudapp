import bcrypt from 'bcrypt';
import { User, Post, Comment } from './models';

/* eslint no-underscore-dangle: [1, { "allow": ["__id"] }] */
// Create User
const createUser = async (arg) => {
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
  return user.save()
    .then((result) => {
      const newUser = {
        id: result._id,
        name: result.name,
        email: result.email,
      };
      return newUser;
    })
    .catch((err) => console.error('Error db: ', err));
};

// Update Password
const updatePassword = async (arg) => {
  const {
    id: _id, password: newPassword,
  } = arg;

  //const hashPassword = await bcrypt.hash(password, 10);
  const password = await bcrypt.hash(newPassword, 10);
  const filter = { _id };
  return Post.findOneAndUpdate(filter, { password },
    // If `new` isn't true, `findOneAndUpdate()` will return the
    // document as it was _before_ it was updated.
    { new: true })
    .then((result) => {
      const updatedUser = {
        id: result._id,
        name: result.name,
        email: result.email,
      };
      return updatedUser;
    })
    .catch((err) => console.error('Error db: ', err));
};

// Delete User
const deleteUser = async (arg) => {
  return User.findByIdAndRemove(arg)
    .then(async (result) => {
      // delete all posts by the userId
      if (result !== null) {
        const { _id } = result;
        const delPostsByUser = await Post.deleteMany({ userId: _id });

        // delete all comments by the userId
        const delCommentsByUser = await Comment.deleteMany({ userId: _id });
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
      const newPost = {
        id: result._id,
        title: result.title,
        userId: result.userId,
        content: result.content,
        createdDate: result.createdDate,
      };
      return newPost;
    })
    .catch((err) => console.error('Error db: ', err));
};

// Update Post
const updatePost = async (arg) => {
  const {
    postId: _id, title, userId, content, createdDate,
  } = arg;
  const filter = { _id };
  return Post.findOneAndUpdate(filter, { title, content, createdDate },
    // If `new` isn't true, `findOneAndUpdate()` will return the
    // document as it was _before_ it was updated.
    { new: true })
    .then((result) => {
      const updatedPost = {
        id: result._id,
        title: result.title,
        userId: result.userId,
        content: result.content,
        createdDate: result.createdDate,
      };
      return updatedPost;
    })
    .catch((err) => console.error('Error db: ', err));
};

// Delete Post
const deletePost = async (arg) => {
  const { userId, postId } = arg;
  return Post.findOneAndDelete({ userId, _id: postId })
    .then(async (result) => {
      // delete all comments by the postId
      if (result !== null) {
        const delCommentByPost = await Comment.deleteMany({ postId: result._id });
      }
      return result;
    })
    .catch((err) => console.error('Error db: ', err));
};

// Create Comment
const createComment = async (arg) => {
  const comment = new Comment({
    _id: arg.id, ...arg,
  });
  return comment.save()
    .then((result) => {
      const newComment = {
        id: result._id,
        userId: result.userId,
        postId: result.postId,
        content: result.content,
        createdDate: result.createdDate,
      };
      return newComment;
    })
    .catch((err) => console.error('Error db: ', err));
};

// Delete Comment
const deleteComment = async (arg) => {
  const { id, userId } = arg;
  return Comment.findOneAndDelete({ userId, _id: id })
    .then((result) => {
      return result;
    })
    .catch((err) => console.error('Error db: ', err));
};

export {
  createUser, updatePassword, deleteUser, createPost, updatePost, deletePost, createComment, deleteComment,
};
