import React, { Component } from 'react';
import { Mutation, Query, ApolloConsumer } from 'react-apollo';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import {
  Item, Header, Segment, Button, Icon, Form,
} from 'semantic-ui-react';
import styled from 'styled-components';
// import NProgress from 'nprogress';
// import CreateFormCategoryTP from './CreateFormCategoryTP';
import Spinner from './Spinner';
import PostCard from './PostCard';
// import Error from './ErrorMessage';
import ErrorMessage from './ErrorMessage';

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

// const perScreen = 5;

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

// const PostList = (props) => {
//   console.log('PostList props: ', props);
//   return (
//   <Query query={ALL_POSTS_QUERY}>
//     {({ data, loading }) => {
//       console.log('ALL_POSTS_QUERY data', data);
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
//               data.posts.map((post) => (
//               <Segment key={post.id}>
//                 <PostCard postcard={post} />
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

const PostList = (props) => {
  console.log('PostList props: ', props);
  return (
  <Query query={ALL_POSTS_QUERY}>
    {({ data, loading, error }) => {
      console.log('ALL_POSTS_QUERY data', data);
      if (loading) {
        return (<div>
            <p>
            Загрузка...
            <i className="spinner icon"></i>
            </p>
          </div>);
      }
      if (error) return (<ErrorMessage error={'Ошибка! Отсутствует соединение с базой данных'}/>);
      if ((typeof data === 'undefined') || (data.posts.length === 0)) return null;
      console.log('CommentList data.posts: ', data.posts);
      return (
          <Item.Group divided relaxed='very'>
            {data.posts.map((post) => (
              <Segment key={post.id}>
                <PostCard postcard={post} />
              </Segment>
            ))
            }
          </Item.Group>
      );
    }}
  </Query>);
};

export { ALL_POSTS_QUERY };
export default PostList;
