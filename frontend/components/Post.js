import React, { Component } from 'react';
import { Mutation, Query } from 'react-apollo';
// import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import styled from 'styled-components';
// import NProgress from 'nprogress';
import withUserContext from '../lib/withUserContext';
import LoadingBar from './LoadingBar';
import PostBlock from './PostBlock';
import { POST_QUERY } from './CommentsPostQueries';
import ErrorMessage from './ErrorMessage';

const RowDiv = styled.div`
`;

// const POST_QUERY = gql`
//   query POST_QUERY(
//     $id: String!
//   ) {
//     post(id: $id) {
//       id
//       title
//       userId
//       content
//       createdDate
//       numberOfCommentsPost
//     }
//   }
// `;

const Post = (props) => {
  // console.log('const Post props: ', props);
  let { authors } = props;
  if (authors === null) authors = [];
  return (
    <Query query={POST_QUERY}
      variables={{ id: props.id }}
    >
      {({ data, loading, error }) => {
        /* if (loading) {
          return (<div>
              <p>
              Загрузка...
              <i className="spinner icon"></i>
              </p>
            </div>);
        } */
        if (loading) return <LoadingBar count={1}/>;
        if (error) return (<ErrorMessage error={'Ошибка! Отсутствует соединение с базой данных'}/>);
        if ((typeof data === 'undefined') || (data.post === null)) return null;
        // console.log('query Post data: ', data);
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
        /* console.log('Post post.userId: ', data.post.userId);
        console.log('Post author: ', author); */
        const post = { ...data.post };
        post.author = { ...author };
        // console.log('Post post: ', post);
        return (
            <RowDiv>
              <PostBlock postItem={post} />
            </RowDiv>
        );
      }}
    </Query>
  );
};

// export { POST_QUERY };
export default withUserContext(Post);
