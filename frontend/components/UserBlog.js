import React, { Component } from 'react';
import { Mutation, Query } from 'react-apollo';
// import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Divider, Header } from 'semantic-ui-react';
// import { ALL_POSTS_QUERY } from './PostList';
import { CURRENT_USER_QUERY } from './User';
import PostCreateForm from './PostCreateForm';
import PostsByUser from './PostsByUser';
import ErrorMessage from './ErrorMessage';
import LoadingBar from './LoadingBar';

const IndexDiv = styled.div`
  margin: 52px 0 0;
`;

const UserBlog = (props) => (
  <Query query={CURRENT_USER_QUERY}>
    {({ data, loading, error }) => {
      if (loading) return <div><p>Загрузка...<i className="spinner icon"></i></p></div>;
      if (error) return <ErrorMessage error={'Ошибка! Отсутствует соединение с базой данных'}/>;
      /* if ((typeof data === 'undefined') || (data.me === null)) return null; */
      if ((typeof data === 'undefined') || (data.me === null)) return <LoadingBar count={2}/>;
      console.log('UserBlog CURRENT_USER_QUERY data', data);
      return (
        <>
          <Header as='h1'>Личный блог</Header>
          <Header as='h3'>Автор: {data.me.name}</Header>
          <Divider horizontal></Divider>
          <Header as='h2'>Добавить новый пост</Header>
          <PostCreateForm id={data.me.id}/>
          <IndexDiv>
            <Header as='h2'>Все посты блога</Header>
            <PostsByUser id={data.me.id}/>
          </IndexDiv>
        </>
      );
    }}
  </Query>
);
export default UserBlog;
