import uuidv4 from 'uuid/v4';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import {
  GraphQLDate,
  GraphQLTime,
  GraphQLDateTime,
} from 'graphql-iso-date';
import moment from 'moment';
import { User, Post, Comment } from '../mongodb/models';
import {
  getUsers, getUser, getUserByArg, getPosts, getPost, getComment, getPostsByUser, getCommentsByPost, getCommentsByUser,
} from '../mongodb/controllersGet';
import {
  createUser, updatePassword, deleteUser, createPost, updatePost, deletePost, createComment, deleteComment,
} from '../mongodb/controllersSet';

/* eslint no-underscore-dangle: [1, { "allow": ["__id"] }] */


//TO-DO: do request throw Promise for catch MongoDB error
const resolvers = {
  DateTime: GraphQLDateTime,
  Query: {
    me: async (parent, arg, context, resolveInfo) => {
      // check if there is a current userId in request
      if (!context.user) {
        return null;
      }
      const { id } = context.user;
      //TO-DO do request throw Promise for catch MongoDB error
      const user = await getUser(id);
      if (!user) return null;
      const postsByUser = await getPostsByUser({ userId: user.id });
      const commentsByUser = await getCommentsByUser({ userId: user.id });
      return {
        ...user,
        numberOfPost: postsByUser.length,
        numberOfComments: commentsByUser.length,
      };
    },
    user: async (_, { id }) => {
      const result = await getUser(id);
      const posts = await getPostsByUser({ userId: result.id });
      const comments = await getCommentsByUser({ userId: result.id });
      return {
        ...result,
        posts,
        comments,
      };
    },
    users: async () => {
      const users = await getUsers();
      if (users === []) return users;
      const usersWithInfo = users.map(async (resUser) => {
        const postsByUser = await getPostsByUser({ userId: resUser.id });
        const commentsByUser = await getCommentsByUser({ userId: resUser.id });
        return {
          ...resUser,
          numberOfPost: postsByUser.length,
          numberOfComments: commentsByUser.length,
        };
      });
      return usersWithInfo;
    },
    post: async (_, { id }) => {
      const resPost = await getPost(id);
      const commentsByPost = await getCommentsByPost({ postId: resPost.id });
      return {
        ...resPost,
        numberOfCommentsPost: commentsByPost.length,
      };
    },
    posts: async () => {
      const posts = await getPosts();
      if (posts === []) return posts;
      const sortPosts = posts.sort((a, b) => {
        const res = b.createdDate - a.createdDate;
        return res;
      }).map(async (resPost) => {
        const comments = await getCommentsByPost({ postId: resPost.id });
        return {
          ...resPost,
          numberOfCommentsPost: comments.length,
        };
      });
      return sortPosts;
    },
    postsByUser: async (_, { id }) => {
      const result = await getPostsByUser({ userId: id });
      if (result === []) return result;
      const sortPosts = result.sort((a, b) => b.createdDate - a.createdDate)
        .map(async (resPost) => {
          const comments = await getCommentsByPost({ postId: resPost.id });
          return {
            ...resPost,
            numberOfCommentsPost: comments.length,
          };
        });
      return sortPosts;
    },
    // commentsByPost: async (_, { id }) => getCommentsByPost({ postId: id }),
    commentsByPost: async (_, { id }) => {
      const comments = await getCommentsByPost({ postId: id });
      if (comments === []) return comments;
      const sortCommens = comments.sort((a, b) => {
        const res = b.createdDate - a.createdDate;
        return res;
      });
      return sortCommens;
    },
    commentsByUser: async (_, { id }) => getCommentsByUser({ userId: id }),
  },

  Mutation: {
    signUp: async (_, { name, email, password }, context) => {
      const id = uuidv4();
      const newUserData = {
        id, name, email, password,
      };
      const user = await createUser(newUserData);
      const expiresIn = '30m'; // '12h';
      // const jwtToken = await jwt.sign(newUser, context.secret, { expiresIn });
      const jToken = await jwt.sign(user, context.secret);
      // set the jwt as a cookie on the response
      context.res.cookie('token', jToken, {
        httpOnly: true,
        maxAge: 1000 * 60 * 30, // Expiry - 30 min
      });
      // return { token: jToken };
      return user;
    },
    signIn: async (_, { email, password }, context) => {
      const AuthArg = ['email', email];
      const user = await getUserByArg(AuthArg);
      if (!user) {
        throw new Error(
          'Пользователя с таким email не существует!',
        );
      }
      const isValidPass = await bcrypt.compare(password, user.password);
      if (!isValidPass) {
        throw new Error(
          'Неверный пароль! Попробуйте еще раз.',
        );
      }
      delete user.password;
      // const expiresIn = '30m'; // '12h';
      // const jToken = await jwt.sign(user, context.secret, { expiresIn });
      const jToken = jwt.sign(user, context.secret);
      // if (!context.response.cookie) context.response.cookie = {};
      // context.response.cookie('token', jToken, {
      context.res.cookie('token', jToken, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 31, // Expiry - 1 year
      });
      // return { token: jToken };
      return user;
    },
    signOut: async (_, args, context) => {
      context.res.clearCookie('token');
      return { message: 'success' };
    },
    updatePassword: async (_, { password }, context) => {
      if (!context.user) {
        return null;
      }
      const { id } = context.user;
      //TO-DO do request throw Promise for catch MongoDB error
      const user = await getUser(id);
      if (!user) {
        throw new Error(
          'Пользователя не существует!',
        );
      }
      const isValidPass = await bcrypt.compare(password, user.password);
      if (!isValidPass) {
        throw new Error(
          'Неверный пароль! Попробуйте еще раз.',
        );
      }
      const newUserData = {
        id, password,
      };
      const updatedUser = await updatePassword(newUserData);
      // const expiresIn = '30m'; // '12h';
      // const jToken = await jwt.sign(user, context.secret, { expiresIn });
      const jToken = jwt.sign(updatedUser, context.secret);
      // console.log(`m updatePassword jToken: ${JSON.stringify(jToken)}`);
      context.res.cookie('token', jToken, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 31, // Expiry - 1 year
      });
      // return { token: jToken };
      return updatedUser;
    },
    deleteUser: async (_, arg, context) => {
      if (!context.user) {
        return null;
      }
      //const userId  = context.user.id;
      const { userId: id, password } = arg;
      //TO-DO do request throw Promise for catch MongoDB error
      const AuthArg = ['_id', id];
      // console.log(`m signIn AuthArg: ${JSON.stringify(AuthArg)}`);
      const user = await getUserByArg(AuthArg);
      //const user = await getUser(context.user.id);
      if (!user) {
        throw new Error(
          'Пользователя не существует!',
        );
      }
      const isValidPass = await bcrypt.compare(password, user.password);
      if (!isValidPass) {
        throw new Error(
          'Неверный пароль! Попробуйте еще раз.',
        );
      }
      const delUser = await deleteUser(id);
      if (!delUser) {
        throw new Error(
          'Ошибка при удалении аккаунта!',
        );
      }
      if (delUser) {
        context.res.clearCookie('token');
        return { message: 'Success' };
      }
    },
    createPost: async (_, {
      userId, title, content,
    }) => {
      const id = uuidv4();
      // const createdDate = new Date().toISOString;
      const createdDate = moment.utc().format();
      const newPostData = {
        id, title, userId, content, createdDate,
      };
      const newPost = await createPost(newPostData);
      return {
        ...newPost,
        comments: [],
      };
    },
    updatePost: async (_, {
      userId, postId, title, content,
    }, context) => {
      const { id } = context.user;
      if (id !== userId) {
        throw new Error('Вы не можете редактировать чужие посты!');
      }
      // const createdDate = new Date().toISOString;
      const createdDate = moment.utc().format();
      const updatePostData = {
        postId, title, userId, content, createdDate,
      };
      const updatedPost = await updatePost(updatePostData);
      return updatedPost;
    },
    deletePost: async (_, { postId, userId }) => {
      const delPost = await deletePost({ userId, postId });
      if (delPost !== null) {
        return { message: 'Success' };
      }
      throw new Error('Вы не можете удалять чужие  посты!');
    },
    createComment: async (_, {
      userId, postId, content,
    }) => {
      const id = uuidv4();
      // const createdDate = new Date().toISOString;
      const createdDate = moment.utc().format();
      const newComment = {
        id, userId, postId, content, createdDate,
      };
      return createComment(newComment);
    },
    deleteComment: async (_, { id, userId }) => {
      const delComment = await deleteComment({ id, userId });
      if (delComment !== null) {
        return { message: 'Success' };
      }
      throw new Error('Вы не можете удалять чужие  комментарии!');
    },
  },

};


export default resolvers;
