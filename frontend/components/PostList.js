import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import { Item, Segment } from 'semantic-ui-react';
import withUserContext from '../lib/withUserContext';
import LoadingBar from './LoadingBar';
import PostCard from './PostCard';
import ErrorMessage from './ErrorMessage';

const ALL_POSTS_QUERY = gql`
  query ALL_POSTS_QUERY {
    posts {
      id
      title
      userId
      content
      createdDate
      numberOfCommentsPost
    }
  }
`;


const PostList = (props) => {
  let { authors } = props;
  if (authors === null) authors = [];
  return (
  <Query query={ALL_POSTS_QUERY}>
    {({ data, loading, error }) => {
      if (loading) return <LoadingBar count={10}/>;
      if (error) return (<ErrorMessage error={'Ошибка! Отсутствует соединение с базой данных'}/>);
      if ((typeof data === 'undefined') || (data.posts.length === 0)) return null;
      return (
        <Item.Group divided relaxed='very'>
          {data.posts.map((item) => {
            let author = authors.find((el) => el.id === item.userId);
            if (typeof author === 'undefined') {
              author = {
                id: '',
                name: '',
                email: '',
                numberOfPost: 0,
                numberOfComments: 0,
              };
            }
            const post = { ...item };
            post.author = { ...author };
            return (
              <Segment key={post.id}>
                <PostCard postcard={post} />
              </Segment>
            );
          })
          }
        </Item.Group>
      );
    }}
  </Query>);
};

export { ALL_POSTS_QUERY };
export default withUserContext(PostList);
