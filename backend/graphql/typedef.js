
import { gql } from 'apollo-server-express';


const typeDefs = gql`
scalar DateTime
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
  comments: [Comment]!
}

type Comment {
  id: String!
  userId: String!
  content: String
  createdDate: DateTime!
  postId: String!
}

# input PostData {
#   id: String!
#   title: String
#   userId: String
#   votes: Int
# }

# type Response {
#   success: Boolean
# }

type Query {
  user(id: String!): User
  users: [User]!
  post(id: String!): Post
  posts: [Post]!
  postsByUser(id: String!): [Post]!
  comments: [Comment]!
  commentsByPost(id: String!): [Comment]!
}

type Mutation {
  createUser(firstName: String, lastName: String): User
  createPost(userId: String!, title: String!, content: String!): Post
  createComment(userId: String!, postId: String!, content: String!): Comment
}
`;

export default typeDefs;
