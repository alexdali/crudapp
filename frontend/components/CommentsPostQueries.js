// import { Query } from 'react-apollo';
import gql from 'graphql-tag';


const COMMENTS_BY_POST_QUERY = gql`
  query COMMENTS_BY_POST_QUERY ($id: String!) {
    commentsByPost(id: $id) {
      id
      postId
      userId
      content
      createdDate
    }
  }
`;

const POST_QUERY = gql`
  query POST_QUERY(
    $id: String!
  ) {
    post(id: $id) {
      id
      title
      userId
      content
      createdDate
      numberOfCommentsPost
    }
  }
`;


export { COMMENTS_BY_POST_QUERY, POST_QUERY };
