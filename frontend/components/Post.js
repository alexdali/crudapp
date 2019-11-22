import React, { Component } from 'react';
import { Mutation, Query, ApolloConsumer } from 'react-apollo';
import gql from 'graphql-tag';
import { adopt } from 'react-adopt';
import PropTypes from 'prop-types';
import {
  Message, Segment, Button, Icon, Form, TextArea, Label,
} from 'semantic-ui-react';
import styled from 'styled-components';
// import NProgress from 'nprogress';
import withUserContext from '../lib/withUserContext';
import PostBlock from './PostBlock';
import { ALL_POSTS_QUERY } from './PostList';
import User, { CURRENT_USER_QUERY } from './User';
import ErrorMessage from './ErrorMessage';

const RowDiv = styled.div`
  /* margin: 52px 0px;*/
  /* padding: 30px 10px;*/
  /* border: 1px solid rgba(34, 36, 38, 0.15);
  border-radius: 0.28571429rem; */
  /* box-shadow: 0 1px 2px 0 rgba(34, 36, 38, 0.15); */
  /* .menu-account-info {
    font-family: 'Montserrat Alternates', 'Roboto', 'Open Sans', sans-serif,
      'Arial';
  }
  .segment.segment-bottom {
    display: flex;
    justify-content: space-between;
  }
  input.title-view {
    font-size: 2.5em;
    padding: 0.5em;
    border: none;
    border-bottom: 1px solid rgba(34, 36, 38, 0.15);
  }
  .post-meta {
    display: flexbox;
    justify-content: space-between;
    padding: 1em 2em 0;
    border-bottom: 1px solid rgba(34, 36, 38, 0.15);
  }
  .ui.form textarea.post-content {
    font-size: 1.5em;
    border: none;
    /* padding: 0.5em; */
  } */
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

const Post = (props) => {
  console.log('const Post props: ', props);
  let { authors } = props;
  if (authors === null) authors = [];
  return (
    <Query query={POST_QUERY}
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
        if ((typeof data === 'undefined') || (data.post === null)) return null;
        console.log('query Post data: ', data);
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
          console.log('Post post.userId: ', data.post.userId);
          console.log('Post author: ', author);
          const post = { ...data.post };
          post.author = { ...author };
          console.log('Post post: ', post);
        return (
            <RowDiv>
              <PostBlock postItem={post} />
            </RowDiv>
        );
      }}
    </Query>
  );
};

export {POST_QUERY};
export default withUserContext(Post);
