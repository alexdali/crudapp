import React, { Component } from 'react';
import { Mutation, Query } from 'react-apollo';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import { Item, Segment } from 'semantic-ui-react';
// import NProgress from 'nprogress';
import withUserContext from '../lib/withUserContext';
import LoadingBar from './LoadingBar';
import PostCard from './PostCard';
import ErrorMessage from './ErrorMessage';

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


const PostList = (props) => {
  console.log('PostList props: ', props);
  let { authors } = props;
  if (authors === null) authors = [];
  return (
  <Query query={ALL_POSTS_QUERY}>
    {({ data, loading, error }) => {
      // console.log('ALL_POSTS_QUERY data', data);
      if (loading) return <LoadingBar count={10}/>;
      /* { (<div>
            <p>
            Загрузка...
            <i className="spinner icon"></i>
            </p>
          </div>) } */
      if (error) return (<ErrorMessage error={'Ошибка! Отсутствует соединение с базой данных'}/>);
      if ((typeof data === 'undefined') || (data.posts.length === 0)) return null;
      // console.log('PostList data.posts: ', data.posts);
      return (
        <Item.Group divided relaxed='very'>
          {data.posts.map((item) => {
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
            // console.log('PostList post.userId: ', item.userId);
            // console.log('PostList author: ', author);
            const post = { ...item };
            post.author = { ...author };
            return (
              <Segment key={post.id}>
                <PostCard postcard={post} />
              </Segment>
            );
          })
          }
        </Item.Group>
      );
    }}
  </Query>);
};

export { ALL_POSTS_QUERY };
export default withUserContext(PostList);
