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
  createUser, deleteUser, createPost, updatePost, deletePost, createComment, deleteComment,
} from '../mongodb/controllersSet';

/* eslint no-underscore-dangle: [1, { "allow": ["__id"] }] */

const resolvers = {
  DateTime: GraphQLDateTime,
  Query: {
    me: async (parent, arg, context, resolveInfo) => {
      // console.log('Query:  me -> ctx.request.userId', ctx.request.userId);
      // console.log('Query: me -> context', context);
      console.log(`query me ctx.user: ${JSON.stringify(context.user)}`);
      // console.log(`query me ctx.req: ${JSON.stringify(ctx.req)}`);
      // console.log(`query me ctx.request: ${JSON.stringify(ctx.request)}`);
      // check if there is a current userId in request
      if (!context.user) {
        return null;
      }
      const { id } = context.user;
      const user = await getUser(id);
      console.log(`query me getUser user: ${JSON.stringify(user)}`);
      if (!user) return null;
      // console.log(`query me req.user: ${JSON.stringify(context.req.user)}`);
      return user;
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
    users: async () => getUsers(),
    post: async (_, { id }) => {
      const resPost = await getPost(id);
      console.log(`query post id: ${id}`);
      console.log(`query post resPost: ${JSON.stringify(resPost)}`);
      const commentsByPost = await getCommentsByPost({ postId: resPost.id });
      console.log('q posts commentsByPost.length: ', commentsByPost.length);
      // console.log(`query post comments: ${JSON.stringify(commentsByPost)}`);
      return {
        ...resPost,
        numberOfCommentsPost: commentsByPost.length,
      };
    },
    posts: async () => {
      const posts = await getPosts();
      console.log(`q posts result getPosts: ${JSON.stringify(posts)}`);
      // const resPostsByUser = result;
      if (posts === []) return posts;
      const sortPosts = posts.sort((a, b) => {
        const res = b.createdDate - a.createdDate;
        // console.log(`q posts sort res b-a: ${res}`);
        return res;
      }).map(async (resPost) => {
        const comments = await getCommentsByPost({ postId: resPost.id });
        // console.log('q posts comments.length: ', comments.length);
        return {
          ...resPost,
          numberOfCommentsPost: comments.length,
        };
      });
      return sortPosts;
    },
    postsByUser: async (_, { id }) => {
      const result = await getPostsByUser({ userId: id });
      // const resPostsByUser = result;
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
      console.log(`q comments result getCommentsByPost: ${JSON.stringify(comments)}`);
      if (comments === []) return comments;
      const sortCommens = comments.sort((a, b) => {
        // console.log(`q comments sort: ${JSON.stringify(a)}`);
        console.log(`q comments sort.createdDate a: ${a.createdDate}`);
        // console.log(`q comments sort: ${JSON.stringify(b)}`);
        console.log(`q comments sort.createdDate b: ${b.createdDate}`);
        const res = b.createdDate - a.createdDate;
        console.log(`q comments sort res b-a: ${res}`);
        return res;
      });
      return sortCommens;
    },
    commentsByUser: async (_, { id }) => getCommentsByUser({ userId: id }),
  },

  Mutation: {
    signUp: async (_, { name, email, password }, context) => {
      // console.log(`m createUser context: ${JSON.stringify(context)}`);
      // console.log(`m createUser context: ${context.secret}`);
      const id = uuidv4();
      const newUserData = {
        id, name, email, password,
      };
      console.log(`m createUser dataNewUser: ${JSON.stringify(newUserData)}`);
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
      // console.log(`m signIn context.res: ${context.res[0]}`);
      // console.log(`m signIn context.req.user: ${JSON.stringify(context.req.user)}`);
      // console.log(`m signIn context: ${context.secret}`);
      const AuthArg = ['email', email];
      // console.log(`m signIn AuthArg: ${JSON.stringify(AuthArg)}`);
      const user = await getUserByArg(AuthArg);
      console.log(`m signIn user: ${JSON.stringify(user)}`);
      if (!user) {
        throw new Error(
          'Пользователя с таким email не существует!',
        );
      }
      const isValidPass = await bcrypt.compare(password, user.password);
      // console.log(`m signIn isValidPass: ${isValidPass}`);
      if (!isValidPass) {
        throw new Error(
          'Неверный пароль! Попробуйте еще раз.',
        );
      }
      delete user.password;
      // const expiresIn = '30m'; // '12h';
      // const jToken = await jwt.sign(user, context.secret, { expiresIn });
      const jToken = jwt.sign(user, context.secret);
      // console.log(`m signIn jToken: ${JSON.stringify(jToken)}`);
      // if (!context.response.cookie) context.response.cookie = {};
      // context.response.cookie('token', jToken, {
      context.res.cookie('token', jToken, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 31, // Expiry - 1 year
      });
      console.log(`m signIn cookie context.res: ${context.res}`);
      // console.log(`m signIn context.req: ${JSON.stringify(context.req)}`);
      // return { token: jToken };
      return user;
    },
    signOut: async (_, args, context) => {
      // console.log(`m signOut args: ${JSON.stringify(args)}`);
      context.res.clearCookie('token');
      // console.log(`m signOut cookie context.res: ${context.res}`);
      return { message: 'success' };
    },
    deleteUser: async (_, { id }) => {
      // console.log(`m deleteUser id: ${JSON.stringify(id)}`);
      const delUser = await deleteUser(id);
      console.log(`m deleteUser delUser: ${JSON.stringify(delUser)}`);
      if (delUser) return { message: 'Success' };
    },
    createPost: async (_, {
      userId, title, content,
    }) => {
      const id = uuidv4();
      // const createdDate = new Date().toISOString;
      const createdDate = moment.utc().format();
      console.log(`m createPost createdDate: ${createdDate}`);
      const newPostData = {
        id, title, userId, content, createdDate,
      };
      console.log(`m createPost newPost: ${JSON.stringify(newPostData)}`);
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
      console.log(`m updatePost createdDate: ${createdDate}`);
      const updatePostData = {
        postId, title, userId, content, createdDate,
      };
      console.log(`m updatePost updatePostData: ${JSON.stringify(updatePostData)}`);
      const updatedPost = await updatePost(updatePostData);
      return updatedPost;
    },
    deletePost: async (_, { postId, userId }) => {
      console.log(`m deletePost postId: ${postId}, userId: ${userId} `);
      const delPost = await deletePost({ userId, postId });
      console.log(`m deletePost delPost: ${JSON.stringify(delPost)}`);
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
      console.log(`m createPost createdDate: ${createdDate}`);
      const newComment = {
        id, userId, postId, content, createdDate,
      };
      return createComment(newComment);
    },
    deleteComment: async (_, { id, userId }) => {
      // console.log(`m deleteComment id: ${JSON.stringify(id)}`);
      const delComment = await deleteComment({ id, userId });
      console.log(`m deleteComment delComment: ${JSON.stringify(delComment)}`);
      if (delComment !== null) {
        return { message: 'Success' };
      }
      throw new Error('Вы не можете удалять чужие  комментарии!');
    },
  },

};


export default resolvers;
