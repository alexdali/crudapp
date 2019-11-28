import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import { Item, Segment } from 'semantic-ui-react';
import withUserContext from '../lib/withUserContext';
import ErrorMessage from './ErrorMessage';
import PostCard from './PostCard';

// const perScreen = 5;

const POSTS_BY_USER_QUERY = gql`
  query POSTS_BY_USER_QUERY($id: String!) {
    postsByUser(id: $id) {
      id
      title
      userId
      content
      createdDate
      numberOfCommentsPost
    }
  }
`;

const PostsByUser = (props) => {
  let { authors } = props;
  if (authors === null) authors = [];
  return (
    <Query
      query={POSTS_BY_USER_QUERY}
      variables={{ id: props.id }}
    >
      {({ data, loading, error }) => {
        if (loading) {
          return (<div>
              <p>
              Загрузка...
              <i className="spinner icon"></i>
              </p>
            </div>);
        }
        if (error) return (<ErrorMessage error={'Ошибка! Отсутствует соединение с базой данных'}/>);
        if ((typeof data === 'undefined') || (data.postsByUser.length === 0)) return null;
        return (
          <Item.Group divided relaxed='very'>
            {data.postsByUser.map((item) => {
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
            })}
          </Item.Group>
        );
      }}
    </Query>
  );
};

export { POSTS_BY_USER_QUERY };
export default withUserContext(PostsByUser);
