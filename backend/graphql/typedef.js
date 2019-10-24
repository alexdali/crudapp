import { gql } from 'apollo-server-express';

const typeDefs = gql`

type User {
  id: Int!
  firstName: String
  lastName: String
  posts: [Post]!
}

type Post {
  id: Int!
  title: String
  userId: String
  votes: Int
  comments: [Comment]!
}

type Comment {
  id: Int!
  userId: String!
  post: String!
}

input PostData {
  id: Int!
  title: String
  userId: String
  votes: Int
}

type Response {
  success: Boolean
}

type Query {

  posts: [Post]
  user(id: Int!): User
}

type Mutation {
  createPost(post: PostData): Response
}
`;

export default typeDefs;
