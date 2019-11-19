import React, { Component } from 'react';
import { Mutation, Query, ApolloConsumer } from 'react-apollo';
import { adopt } from 'react-adopt';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import {
  Message, Segment, Button, Icon, Form, TextArea, Label, Header, Divider,
} from 'semantic-ui-react';
import TextareaAutosize from 'react-textarea-autosize';
import Router from 'next/router';
import styled from 'styled-components';
// import NProgress from 'nprogress';
import withUserContext from '../lib/withUserContext';
import CommentCreateForm from './CommentCreateForm';
// import { ALL_POSTS_QUERY } from './PostList';
// import User,{ CURRENT_USER_QUERY } from './User';
import CommentList from './CommentList';

// const RowDiv = styled.div`
//   input.title-view {
//     width: 100%;
//     font-size: 2.5em;
//     padding: 0.5em;
//     border: none;
//     border-bottom: 1px solid rgba(34, 36, 38, 0.15);
//   }
//   .post-meta {
//     display: flexbox;
//     justify-content: space-between;
//     padding: 1em 2em 0;
//     border-bottom: 1px solid rgba(34, 36, 38, 0.15);
//   }
//   .ui.form > div.field.post-content > textarea {
//     font-size: 1.5em;
//     border: none;
//     /* padding: 0.5em; */
//     /* height: auto; */
//     max-height: 100%;
//     resize: none;
//   }
// `;

const CommentDiv = styled.div`
   margin: 2.5em 0 0.5em;
   padding: 0.5em;
   /*
   width: 100%;
   font-size: 2.5em;
   border: none;
   border-bottom: 1px solid rgba(34, 36, 38, 0.15);} */
   form > div.field.comment-content > textarea {
    /* font-size: 1.5em;
    border: none;
    /* padding: 0.5em; */
    /* height: auto;
    max-height: 100%; */
    resize: none;
  }
 `;

// const DELETE_POST_MUTATION = gql`
//   mutation DELETE_POST_MUTATION(
//     $postId: String!
//     $userId: String!
//   ) {
//     deletePost(
//       postId: $postId
//       userId: $userId
//       ) {
//         message
//     }
//   }
// `;

const CommentBlock = (props) => {
  console.log('CommentBlock props: ', props);
  const { post, userId } = props;
  console.log('CommentBlock userId: ', userId);
  console.log('CommentBlock postId: ', post.id);
  console.log('CommentBlock numberOfCommentsPost: ', post.numberOfCommentsPost);
  return (
    <CommentDiv>
      <Header as='h3'>Комментарии {post.numberOfCommentsPost}</Header>
      <Divider horizontal></Divider>
      {userId && <CommentCreateForm {...props}/>}
      <Divider horizontal></Divider>
      <CommentList postId={post.id}/>
    </CommentDiv>
  );
};

export default withUserContext(CommentBlock);
