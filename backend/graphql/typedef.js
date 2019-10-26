
import { gql } from 'apollo-server-express';


const typeDefs = gql`
scalar DateTime
type SuccessMessage {
  message: String
}
type User {
  id: String!
  firstName: String!
  lastName: String
  posts: [Post]
}

type Post {
  id: String!
  title: String!
  userId: String!
  content: String
  createdDate: DateTime!
  # commentsByPost: [Comment]!
}

type Comment {
  id: String!
  userId: String!
  content: String
  createdDate: DateTime!
  postId: String!
}

type Query {
  user(id: String!): User
  users: [User]!
  post(id: String!): Post
  posts: [Post]!
  postsByUser(id: String!): [Post]!
  commentsByPost(id: String!): [Comment]!
  commentsByUser(id: String!): [Comment]!
}

type Mutation {
  createUser(firstName: String, lastName: String): User
  deleteUser(id: String!): SuccessMessage
  createPost(userId: String!, title: String!, content: String!): Post
  deletePost(postId: String!, userId: String!): SuccessMessage
  createComment(userId: String!, postId: String!, content: String!): Comment
  deleteComment(id: String!, userId: String!): SuccessMessage
}
`;

export default typeDefs;
