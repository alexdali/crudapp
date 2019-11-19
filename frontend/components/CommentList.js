import React, { Component } from 'react';
import { Mutation, Query, ApolloConsumer } from 'react-apollo';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import {
  Item, Header, Segment, Button, Icon, Form, Label, Divider,
} from 'semantic-ui-react';
import styled from 'styled-components';
import moment from 'moment';
// import NProgress from 'nprogress';
import Spinner from './Spinner';
import ErrorMessage from './ErrorMessage';

// const RowDiv = styled.div`
//   /* margin: 52px 0px; */
//   padding: 30px 10px;
//   /* border: 1px solid rgba(34, 36, 38, 0.15);
//   border-radius: 0.28571429rem; */
//   /* box-shadow: 0 1px 2px 0 rgba(34, 36, 38, 0.15); */
//   /* .menu-account-info {
//     font-family: 'Montserrat Alternates', 'Roboto', 'Open Sans', sans-serif,
//       'Arial';
//   }
//   .segment.segment-bottom {
//     display: flex;
//     justify-content: space-between;
//   } */
// `;


// item-meta

// const ItemsList = styled.div`
//   /* display: grid; */
//   display: block;
//   /* grid-template-columns: 1fr 1fr;
//   grid-gap: 60px; */
//   max-width: ${(props) => props.theme.maxWidth};
//   margin: 2.5rem 3rem;
//   padding: 0 4em;
//   @media (max-width: 700px) {
//     margin: 2.5rem 1rem;
//   }
// `;

// const ItemMeta = styled.div`
//   font-size: 0.65em;
//   display: flex;
//   justify-content: space-between;
// `;

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
              {/* <Item.Header as='h3'>{title}</Item.Header> */}
              {/* <Divider clearing /> */}
              {/* <Label as='span' color='orange' ribbon='right'>
                {createdDate}
              </Label> */}
              <div className='item-meta'>
                <Item.Meta>{userId}</Item.Meta>
                <Item.Meta>{moment(createdDate).format('DD MMMM YYYY HH:mm')}</Item.Meta>
              </div>
              <div>{content}</div>
              {/* <Item.Description>
                {content}
              </Item.Description> */}
               {/* <Divider horizontal></Divider>
              <Item.Extra>
                <Label size="medium" >
                  <Icon name='comment alternate outline'/> 12
                </Label>
              </Item.Extra> */}
            </Item.Content>
          </ItemDiv>
  );
};

// const CommentList = (props) => {
//   console.log('CommentList props: ', props);
//   const { postId } = props;
//   return (
//   <Query
//     query={COMMENTS_BY_POST_QUERY}
//     variables={postId}
//   >
//     {({ data, loading }) => {
//       console.log('COMMENTS_BY_POST_QUERY data', data);
//       return (
//         loading ? (
//           <Spinner/>
//           /* <div>
//             <p>
//             Загрузка...
//             <i className="spinner icon"></i>
//             </p>
//           </div> */
//         )
//           : (
//           <Item.Group divided relaxed='very'>
//             {data ? (
//               data.comments.map((comment) => (
//               <Segment key={comment.id}>
//                 <CommentCard commentcard={comment} />
//               </Segment>
//               ))
//             )
//               : <ErrorMessage error={'Ошибка! Отсутствует соединение с базой данных'}/>
//             }
//           </Item.Group>
//           )
//       );
//     }}
//   </Query>);
// };

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
