import uuidv4 from 'uuid/v4';
import {
  GraphQLDate,
  GraphQLTime,
  GraphQLDateTime,
} from 'graphql-iso-date';
import moment from 'moment';
import { User, Post, Comment } from '../mongodb/models';
import {
  getUsers, getUser, getPosts, getPost, getPostsByUser, getComments, getCommentsByPost,
} from '../mongodb/controllersGet';
import {
  createUser, createPost, createComment,
} from '../mongodb/controllersUpdate';

const usersMock = [
  { id: '1', firstName: 'Tom', lastName: 'Coleman' },
  { id: '2', firstName: 'Sashko', lastName: 'Stubailo' },
  { id: '3', firstName: 'Mikhail', lastName: 'Novikov' },
];

const postsMock = [
  {
    id: '1', userId: '1', title: 'Introduction to GraphQL', content: 'content Introduction to GraphQL',
  },
  {
    id: '2', userId: '2', title: 'Welcome to Meteor', content: 'content Welcome to Meteor',
  },
  {
    id: '3', userId: '2', title: 'Advanced GraphQL', content: 'content Advanced GraphQL',
  },
  {
    id: '4', userId: '3', title: 'Launchpad is Cool', content: 'content Launchpad is Cool',
  },
];

const commentsMock = [
  {
    id: '1', userId: '1', postId: '1', content: 'Comment Introduction to GraphQL',
  },
  {
    id: '2', userId: '2', postId: '2', content: 'Comment Welcome to Meteor',
  },
  {
    id: '3', userId: '2', postId: '2', content: 'Comment Advanced GraphQL',
  },
  {
    id: '4', userId: '3', postId: '3', content: 'Comment Launchpad is Cool',
  },
];

const resolvers = {
  DateTime: GraphQLDateTime,
  Query: {
    user: (_, { id }) => getUser(id),
    // const userReq = usersMock.filter((user) => user.id === id);
    // console.log(`query UserReq: ${userReq}, id: ${id}`);
    // return userReq[0];
    users: () => getUsers(), // console.log('query users', usersMock);
    // return usersMock;
    post: (_, { id }) => getPost(id),
    // const postReq = postsMock.filter((post) => post.id === id);
    // console.log(`query PostReq: ${postReq}, id: ${id}`);
    // if (!postReq[0]) {
    //   return null;
    // }
    // postReq[0].comments = commentsMock.filter((comment) => comment.postId === postReq[0].id);
    // console.log(`query post PostReq: ${JSON.stringify(postReq)}`);
    // return postReq[0];

    posts: () => getPosts(),
    // {
    //   const postsMockReq = postsMock.map((post) => {
    //     const newItem = { ...post };
    //     newItem.comments = commentsMock.filter((comment) => comment.postId === newItem.id);
    //     console.log('query posts');
    //     return newItem;
    //   });
    //   return postsMockReq;
    // },
    postsByUser: (_, { id }) => getPostsByUser({ userId: id }),
    // {
    //   const postsReq = postsMock.filter((post) => post.userId === id);
    //   // console.log('query users.filter', comments.id);
    //   console.log(`query PostsReq: ${postsReq}, id: ${id}`);
    //   return postsReq;
    // },
    comments: () => getComments(),
    // {
    //   console.log('query comments', commentsMock);
    //   return commentsMock;
    // },
    commentsByPost: (_, { id }) => getCommentsByPost({ postId: id }),
    // {
    //   const commentsReq = commentsMock.filter((comment) => comment.postId === id);
    //   // console.log('query users.filter', comments.id);
    //   console.log(`query CommentsReq: ${commentsReq}, id: ${id}`);
    //   return commentsReq;
    // },
  },

  Mutation: {
    createUser: async (_, { firstName, lastName }) => {
      const id = uuidv4();
      const dataNewUser = {
        id, firstName, lastName,
      };
      console.log(`m createUser dataNewUser: ${JSON.stringify(dataNewUser)}`);

      return createUser(dataNewUser);
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
    createPost: (_, {
      title, userId, content,
    }) => {
      const id = uuidv4();
      // const createdDate = new Date().toISOString;
      const createdDate = moment.utc().format();
      console.log(`m createPost createdDate: ${createdDate}`);
      const newPost = {
        id, title, userId, content, createdDate,
      };
      console.log(`m createPost newPost: ${JSON.stringify(newPost)}`);
      // return new Promise((resolve, reject) => {
      // const len = postsMock.length;
      // const newLen = postsMock.push(newPost);
      createPost(newPost);
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
    createComment: (_, {
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
      createComment(newComment);
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
  },

};


export default resolvers;
