// import { find } from "lodash";

const authors = [
  { id: 1, firstName: 'Tom', lastName: 'Coleman' },
  { id: 2, firstName: 'Sashko', lastName: 'Stubailo' },
  { id: 3, firstName: 'Mikhail', lastName: 'Novikov' },
];

const posts = [
  {
 id: 1, authorId: 1, title: 'Introduction to GraphQL', votes: 2 
},
  {
 id: 2, authorId: 2, title: 'Welcome to Meteor', votes: 3 
},
  {
 id: 3, authorId: 2, title: 'Advanced GraphQL', votes: 1 
},
  {
 id: 4, authorId: 3, title: 'Launchpad is Cool', votes: 7 
},
];

const resolvers = {
  Query: {
    posts: () => {
      console.log('query posts', posts);
      return posts;
    },
    author: (_, { id }) => {
      const authorReq = authors.filter((author) => {
        console.log('query authors.filter', author.id);
        return author.id === id; 
});
      console.log(`query authorReq: ${authorReq}, id: ${id}`);
      return authorReq[0];
    },
  },

  Mutation: {
    createPost: (_, newPost) => {
      posts.push(newPost.post);
      const result = {
        success: true,
      };
      return result;
    },
  },

};


export default resolvers;
