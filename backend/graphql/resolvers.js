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
      // run query for User by userId from database
      // return ctx.db.query.user(
      //   {
      //     where: { id: ctx.request.userId },
      //   },
      //   info
      // );
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
    // const userReq = usersMock.filter((user) => user.id === id);
    // console.log(`query UserReq: ${userReq}, id: ${id}`);
    // return userReq[0];
    users: async () => getUsers(),
    post: async (_, { id }) => {
      const resPost = await getPost(id);
      console.log(`query post id: ${id}`);
      console.log(`query post resPost: ${JSON.stringify(resPost)}`);
      const commentsByPost = await getCommentsByPost({ postId: resPost.id });
      // return resPost;
      console.log(`query post comments: ${JSON.stringify(commentsByPost)}`);
      return {
        ...resPost,
        // commentsByPost,
      };
    },
    // comment: async (_, { id }) => {
    //   const resComment = await getComment(id);
    //   console.log(`query comment resComment: ${JSON.stringify(resComment)}`);
    //   return resComment;
    // },
    // comments: async (_, { postId, userId }) => {
    //   if (!postId === '') {
    //     const resCommentsByPost = await getCommentsByPost(postId);
    //     console.log(`query comments resCommentsByPost: ${JSON.stringify(resCommentsByPost)}`);
    //     return resComment;
    //   }
    // },
    // const postReq = postsMock.filter((post) => post.id === id);
    // console.log(`query PostReq: ${postReq}, id: ${id}`);
    // if (!postReq[0]) {
    //   return null;
    // }
    // postReq[0].comments = commentsMock.filter((comment) => comment.postId === postReq[0].id);
    // console.log(`query post PostReq: ${JSON.stringify(postReq)}`);
    // return postReq[0];

    posts: async () => {
      const posts = await getPosts();
      console.log(`q posts result: ${JSON.stringify(posts)}`);
      // const resPostsByUser = result;
      if (posts !== []) {
        return posts.map(async (resPost) => {
        // const res = resPost;
          const comments = await getCommentsByPost({ postId: resPost.id });
          console.log(`q posts comments.length: `, comments.length);
          return {
            ...resPost,
            numberOfCommentsPost: comments.length,
          };
        });
      }
      console.log(`q posts result + comment.length: ${JSON.stringify(posts)}`);
      return posts;
    },
    // {
    //   const postsMockReq = postsMock.map((post) => {
    //     const newItem = { ...post };
    //     newItem.comments = commentsMock.filter((comment) => comment.postId === newItem.id);
    //     console.log('query posts');
    //     return newItem;
    //   });
    //   return postsMockReq;
    // },
    postsByUser: async (_, { id }) => {
      const result = await getPostsByUser({ userId: id });
      // const resPostsByUser = result;
      if (result !== []) {
        return result.map(async (resPost) => {
        // const res = resPost;
          const comments = await getCommentsByPost({ postId: resPost.id });
          // res.comments = [...comments];
          //const numberOfCommentsPost = comment.length;
          // return res;
          return {
            ...resPost,
            numberOfCommentsPost: comments.length,
          };
        });
      }
      // if result === [] empty array
      return result;

      // const resComments = result.map((comment) => {
      //   const resItem = {
      //     id: comment._id,
      //     userId: comment.userId,
      //     postId: comment.postId,
      //     content: comment.content,
      //     createdDate: comment.createdDate,
      //   };
      //   console.log(`c getUser resItem: ${JSON.stringify(resItem)}`);
      //   return resItem;
      // });
      // return resComments;
    },
    // {
    //   const postsReq = postsMock.filter((post) => post.userId === id);
    //   // console.log('query users.filter', comments.id);
    //   console.log(`query PostsReq: ${postsReq}, id: ${id}`);
    //   return postsReq;
    // },
    // comments: () => getComments(),
    commentsByPost: async (_, { id }) => getCommentsByPost({ postId: id }), // {
    // const result = getCommentsByPost({ postId: id });
    // return result.map((comment) => ({
    //   id: comment._id,
    //   userId: comment.userId,
    //   postId: comment.postId,
    //   content: comment.content,
    //   createdDate: comment.createdDate,
    // }));
    // return resComments;
    // }

    // {
    //   const commentsReq = commentsMock.filter((comment) => comment.postId === id);
    //   // console.log('query users.filter', comments.id);
    //   console.log(`query CommentsReq: ${commentsReq}, id: ${id}`);
    //   return commentsReq;
    // },
    commentsByUser: async (_, { id }) => getCommentsByUser({ userId: id }),
  },

  Mutation: {
    // createUser: async (_, { firstName, lastName }) => {
    //   const id = uuidv4();
    //   const newUserData = {
    //     id, firstName, lastName,
    //   };
    //   console.log(`m createUser dataNewUser: ${JSON.stringify(newUserData)}`);

    //   const newUser = await createUser(newUserData);
    //   return {
    //     ...newUser,
    //     posts: [],
    //   };
    signUp: async (_, { name, email, password }, context) => {
      // console.log(`m createUser context: ${JSON.stringify(context)}`);
      console.log(`m createUser context: ${context.secret}`);
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
      // console.log(`m createUser new: ${newU}`);
      // return newU;
      // usersMock.push(newUser);
      // console.log(`m createUser usersMock len: ${usersMock.length}`);
      // const newUserReq = usersMock.filter((user) => user.id === id);
      // console.log(`m createUser newUserReq: ${JSON.stringify(newUserReq[0])}`);
      // if (!newUserReq[0]) {
      //   // return reject('error');
      //   return null;
      // }
      // // return resolve(postsMock[len - 1]);
      // return newUserReq[0];
      // });
      // return newUser;
    },
    signIn: async (_, { email, password }, context) => {
      console.log(`m signIn context.res: ${context.res[0]}`);
      // console.log(`m signIn context.req.user: ${JSON.stringify(context.req.user)}`);
      console.log(`m signIn context: ${context.secret}`);

      const AuthArg = ['email', email];
      console.log(`m signIn AuthArg: ${JSON.stringify(AuthArg)}`);

      const user = await getUserByArg(AuthArg);
      console.log(`m signIn user: ${JSON.stringify(user)}`);
      if (!user) {
        throw new Error(
          'Пользователя с таким email не существует!',
        );
      }

      const isValidPass = await bcrypt.compare(password, user.password);
      console.log(`m signIn isValidPass: ${isValidPass}`);
      if (!isValidPass) {
        throw new Error(
          'Неверный пароль! Попробуйте еще раз.',
        );
      }
      delete user.password;
      const expiresIn = '30m'; // '12h';
      // const jToken = await jwt.sign(user, context.secret, { expiresIn });
      const jToken = jwt.sign(user, context.secret);
      console.log(`m signIn jToken: ${JSON.stringify(jToken)}`);
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
      console.log(`m signOut args: ${JSON.stringify(args)}`);

      context.res.clearCookie('token');
      console.log(`m signOut cookie context.res: ${context.res}`);

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
      // return new Promise((resolve, reject) => {
      // const len = postsMock.length;
      // const newLen = postsMock.push(newPost);
      // return createPost(newPost);

      const newPost = await createPost(newPostData);
      return {
        ...newPost,
        comments: [],
      };
      // postsMock.push(newPost);
      // console.log(`m createPost postsMock len: ${postsMock.length}`);
      // const newPostReq = postsMock.filter((post) => post.id === id);
      // console.log(`m createPost newPostReq: ${JSON.stringify(newPostReq[0])}`);
      // if (!newPostReq[0]) {
      //   // return reject('error');
      //   return null;
      // }
      // // return resolve(postsMock[len - 1]);
      // return newPostReq[0];
      // });
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
      // return { message: 'success' };
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
      // const len = commentsMock.length;
      // const newLen = commentsMock.push(newComment);
      return createComment(newComment);
      // commentsMock.push(newComment);
      // // if (newLen === len) {
      // //   return null;
      // // }
      // const newCommentReq = commentsMock.filter((comment) => comment.id === id);
      // console.log(`m createPost newPostReq: ${JSON.stringify(newCommentReq[0])}`);
      // if (!newCommentReq[0]) {
      //   // return reject('error');
      //   return null;
      // }
      // return newCommentReq[0];
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
