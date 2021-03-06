
import { gql } from 'apollo-server-express';

const typeDefs = gql`

scalar DateTime
type Token {
  token: String!
}
type SuccessMessage {
  message: String
}
type User {
  id: String!
  name: String!
  email: String!
  password: String!
  numberOfPost: Int!
  numberOfComments: Int!
  # posts: [Post]
}

type Post {
  id: String!
  title: String!
  userId: String!
  content: String
  createdDate: DateTime!
  numberOfCommentsPost: Int!
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
  me: User
  user(id: String!): User
  users: [User]!
  post(id: String!): Post
  posts: [Post]!
  postsByUser(id: String!): [Post]!
  commentsByPost(id: String!): [Comment]!
  commentsByUser(id: String!): [Comment]!
}

type Mutation {
  signUp(name: String!, email: String!, password: String!): User!
  signIn(email: String!, password: String!): User
  signOut: SuccessMessage
  updatePassword(password: String!): SuccessMessage
  deleteUser(userId: String!, password: String!): SuccessMessage
  createPost(userId: String!, title: String!, content: String!): Post!
  updatePost(userId: String!, postId: String!, title: String!, content: String!): Post!
  deletePost(postId: String!, userId: String!): SuccessMessage
  createComment(userId: String!, postId: String!, content: String!): Comment
  deleteComment(id: String!, userId: String!): SuccessMessage
}
`;

export default typeDefs;
