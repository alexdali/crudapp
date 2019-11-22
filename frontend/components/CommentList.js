import React, { Component } from 'react';
import { Mutation, Query, ApolloConsumer } from 'react-apollo';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import {
  Item, Header, Segment, Button, Icon, Form, Label, Divider,
} from 'semantic-ui-react';
import styled from 'styled-components';
import moment from 'moment';
import Spinner from './Spinner';
import ErrorMessage from './ErrorMessage';

const ItemDiv = styled.div`
  margin: 1.5em 2em 0em;
  border: none;
   border-bottom: 1px solid rgba(34, 36, 38, 0.15);
  .item-meta {
  font-size: 0.65em;
  display: flex;
  justify-content: space-between;
  }
`;

// const perScreen = 5;

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

const CommentCard = (props) => {
  // static propTypes = {
  //   comment: PropTypes.shape({
  //     id: PropTypes.string,
  //     userId: PropTypes.string,
  //     postId: PropTypes.string,
  //     content: PropTypes.string,
  //     createdDate: PropTypes.string,
  //   }).isRequired,
  // };
  const {
    id, userId, postId, content, createdDate,
  } = props.comment;
  console.log('CommentCard props', props);
  return (
    <ItemDiv>
      <Item.Content>
        <div className='item-meta'>
          <Item.Meta>{userId}</Item.Meta>
          <Item.Meta>{moment(createdDate).format('DD MMMM YYYY HH:mm')}</Item.Meta>
        </div>
        <div>{content}</div>
      </Item.Content>
    </ItemDiv>
  );
};

const CommentList = (props) => {
  console.log('CommentList props: ', props);
  const { postId } = props;
  console.log('CommentList postId: ', postId);
  return (
    <Query
      query={COMMENTS_BY_POST_QUERY}
      variables={{ id: postId }}
    >
      {({ data, loading, error }) => {
        console.log('COMMENTS_BY_POST_QUERY data', data);
        if (loading) {
          return (<div>
              <p>
              Загрузка...
              <i className="spinner icon"></i>
              </p>
            </div>);
        }
        if (error) return (<ErrorMessage error={'Ошибка! Отсутствует соединение с базой данных'}/>);
        if ((typeof data === 'undefined') || (data.commentsByPost.length === 0)) return null;
        console.log('CommentList data.commentsByPost: ', data.commentsByPost);
        return (
          <Item.Group divided relaxed='very'>
            {data.commentsByPost.map((item) => <CommentCard key={item.id} comment={item} />)}
          </Item.Group>
        );
      }}
    </Query>);
};

export { COMMENTS_BY_POST_QUERY };
export default CommentList;
