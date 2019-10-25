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
  content: String
  votes: Int
  comments: [Comment]!
}

type Comment {
  id: Int!
  userId: String!
  content: String
  postId: String!
}

# input PostData {
#   id: Int!
#   title: String
#   userId: String
#   votes: Int
# }

# type Response {
#   success: Boolean
# }

type Query {
  user(id: Int!): User
  users: [User]!
  post(id: Int!): Post
  posts: [Post]!
  commentsByPost(id: Int!): [Comment]!
}

type Mutation {
  createPost(id: Int!, title: String, userId: String!, content: String): Post
  createComment(id: Int!, userId: String!, postId: String!, content: String): Comment
}
`;

export default typeDefs;
