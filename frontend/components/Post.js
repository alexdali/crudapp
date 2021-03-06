import React from 'react';
import { Query } from 'react-apollo';
// import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import withUserContext from '../lib/withUserContext';
import LoadingBar from './LoadingBar';
import PostBlock from './PostBlock';
import { POST_QUERY } from './CommentsPostQueries';
import ErrorMessage from './ErrorMessage';

const RowDiv = styled.div`
`;

const Post = (props) => {
  let { authors } = props;
  if (authors === null) authors = [];
  return (
    <Query query={POST_QUERY}
      variables={{ id: props.id }}
    >
      {({ data, loading, error }) => {
        if (loading) return <LoadingBar count={1}/>;
        if (error) return (<ErrorMessage error={'Ошибка! Отсутствует соединение с базой данных'}/>);
        if ((typeof data === 'undefined') || (data.post === null)) return null;
        let author = authors.find((el) => el.id === data.post.userId);
        if (typeof author === 'undefined') {
          author = {
            id: '',
            name: '',
            email: '',
            numberOfPost: 0,
            numberOfComments: 0,
          };
        }
        const post = { ...data.post };
        post.author = { ...author };
        return (
            <div>
              <PostBlock postItem={post} />
            </div>
        );
      }}
    </Query>
  );
};

export default withUserContext(Post);
