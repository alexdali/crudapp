// import { find } from "lodash";

const usersMock = [
  { id: 1, firstName: 'Tom', lastName: 'Coleman' },
  { id: 2, firstName: 'Sashko', lastName: 'Stubailo' },
  { id: 3, firstName: 'Mikhail', lastName: 'Novikov' },
];

const postsMock = [
  {
    id: 1, usersId: 1, title: 'Introduction to GraphQL', content: 'content Introduction to GraphQL',
  },
  {
    id: 2, usersId: 2, title: 'Welcome to Meteor', content: 'content Welcome to Meteor',
  },
  {
    id: 3, usersId: 2, title: 'Advanced GraphQL', content: 'content Advanced GraphQL',
  },
  {
    id: 4, usersId: 3, title: 'Launchpad is Cool', content: 'content Launchpad is Cool',
  },
];

const commentsMock = [
  {
    id: 1, usersId: 1, postsId: 1, content: 'Comment Introduction to GraphQL',
  },
  {
    id: 2, usersId: 2, postsId: 2, content: 'Comment Welcome to Meteor',
  },
  {
    id: 3, usersId: 2, postsId: 2, content: 'Comment Advanced GraphQL',
  },
  {
    id: 4, usersId: 3, postsId: 3, content: 'Comment Launchpad is Cool',
  },
];

const resolvers = {
  Query: {
    user: (_, { id }) => {
      const userReq = usersMock.filter((user) => user.id === id);
      console.log(`query UserReq: ${userReq}, id: ${id}`);
      return userReq[0];
    },
    users: () => {
      console.log('query users', usersMock);
      return usersMock;
    },
    post: (_, { id }) => {
      const postReq = postsMock.filter((post) => post.id === id);
      console.log(`query PostReq: ${postReq}, id: ${id}`);
      return postReq[0];
    },
    posts: () => {
      console.log('query posts', postsMock);
      return postsMock;
    },
    commentsByPost: (_, { id }) => {
      const commentsReq = commentsMock.filter((comments) => comments.postId === id);
      // console.log('query users.filter', comments.id);
      console.log(`query CommentsReq: ${commentsReq}, id: ${id}`);
      return commentsReq;
    },
  },

  Mutation: {
    createPost: (_, {
      id, title, userId, content,
    }) => {
      const newPost = {
        id, title, userId, content,
      };
      postsMock.push(newPost);
      const len = postsMock.length;
      const result = len === 0 ? {} : postsMock[len - 1];
      return result;
    },
    createComment: (_, {
      id, userId, postId, content,
    }) => {
      const newComment = {
        id, userId, postId, content,
      };
      commentsMock.push(newComment);
      const len = commentsMock.length;
      const result = len === 0 ? {} : commentsMock[len - 1];
      return result;
    },
  },

};


export default resolvers;
