import React, { Component } from 'react';
import { Mutation, Query, ApolloConsumer } from 'react-apollo';
import { adopt } from 'react-adopt';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import {
  Message, Segment, Button, Icon, Form, TextArea, Label, Header, Divider, Item
} from 'semantic-ui-react';
import TextareaAutosize from 'react-textarea-autosize';
import moment from 'moment';
import Router from 'next/router';
import styled from 'styled-components';
// import NProgress from 'nprogress';
import withUserContext from '../lib/withUserContext';
import CommentCreateForm from './CommentCreateForm';
//import CommentList from './CommentList';
import ErrorMessage from './ErrorMessage';

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

 const CommentCard = (props) => {
  console.log('CommentCard props: ', props);
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
          <Item.Meta>{props.comment.author.name}</Item.Meta>
          <Item.Meta>{moment(createdDate).format('DD MMMM YYYY HH:mm')}</Item.Meta>
        </div>
        <div>{content}</div>
      </Item.Content>
    </ItemDiv>
  );
};


// const CommentBlock = (props) => {
//   console.log('CommentBlock props: ', props);
//   const { post, userId } = props;
//   console.log('CommentBlock userId: ', userId);
//   console.log('CommentBlock postId: ', post.id);
//   console.log('CommentBlock numberOfCommentsPost: ', post.numberOfCommentsPost);
//   return (
//     <CommentDiv>
//       <Header as='h3'>Комментарии {post.numberOfCommentsPost}</Header>
//       <Divider horizontal></Divider>
//       {userId && <CommentCreateForm {...props}/>}
//       <Divider horizontal></Divider>
//       <CommentList postId={post.id}/>
//     </CommentDiv>
//   );
// };

//TO-DO: pagination

const CommentBlock = (props) => {
  console.log('CommentBlock props: ', props);
  const { post, userId, authors } = props;
  console.log('CommentBlock post.id: ', post.id);
  //let commentsByPost= [];
  return (
    
    <Query
      query={COMMENTS_BY_POST_QUERY}
      variables={{ id: post.id }}
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
        const commentsByPost = ((typeof data === 'undefined') || (data.commentsByPost.length === 0)) ? [] : data.commentsByPost;
        //console.log('CommentBlock data.commentsByPost: ', data.commentsByPost);
        //const {commentsByPost}= data;
        //commentsByPost= data.commentsByPost;
        console.log('CommentBlock commentsByPost: ', commentsByPost);
        return (
          <CommentDiv>
            <Divider horizontal>
              <Header as='h3'>
                <Icon name='comment alternate outline' />
                Комментарии {commentsByPost.length}
              </Header>
            </Divider>
            {userId && <CommentCreateForm {...props}/>}
            <Divider horizontal></Divider>
              <Item.Group divided relaxed='very'>
                {
                  commentsByPost.map(item => {
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
                    console.log('commentsByPost item.userId: ', item.userId);
                    console.log('commentsByPost author: ', author);
                    const comment = { ...item };
                    comment.author = { ...author };
                    console.log('commentsByPost comment: ', comment);

                    return (<CommentCard key={comment.id} comment={comment} />);
                  })
                }
              </Item.Group>
            </CommentDiv>
        );
      }}
    </Query>
    
    );
};

export { COMMENTS_BY_POST_QUERY };
export default withUserContext(CommentBlock);
