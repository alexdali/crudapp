import React, { Component } from 'react';
import { Mutation, Query, ApolloConsumer } from 'react-apollo';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import {
  Item, Header, Segment, Button, Icon, Form,
} from 'semantic-ui-react';
import styled from 'styled-components';
// import NProgress from 'nprogress';
import withUserContext from '../lib/withUserContext';
import ErrorMessage from './ErrorMessage';
import PostCard from './PostCard';
// import Error from './ErrorMessage';

const RowDiv = styled.div`
  margin: 52px 0px;
  padding: 30px 10px;
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
  } */
`;

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


// const PostsByUser = (props) => (
//   <Query
//     query={POSTS_BY_USER_QUERY}
//     variables={{ id: props.id }}
//   >
//     {({ data, loading, error }) => {
//       console.log('POSTS_BY_USER_QUERY data', data);
//       return (
//         loading ? (
//           <div>
//             <p>
//             Загрузка...
//             <i className="spinner icon"></i>
//             </p>
//           </div>
//         )
//           : (
//           <Item.Group divided relaxed='very'>
//             {data.postsByUser.map((post) => (
//               <Segment key={post.id}>
//                 <PostCard postcard={post} />
//               </Segment>
//             ))}
//           </Item.Group>
//           )
//       );
//     }}
//   </Query>
// );

const PostsByUser = (props) => {
  console.log('PostsByUser props: ', props);
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
        console.log('POSTS_BY_USER_QUERY data', data);
        return (
          <Item.Group divided relaxed='very'>
            {data.postsByUser.map((item) => {
              // if(authors!==null)
              // const author = authors.filter(el=> el.id===item.userId);
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
              // console.log('PostsByUser post.userId: ', item.userId);
              // console.log('PostsByUser author: ', author);
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
