import React, { Component } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { Segment } from 'semantic-ui-react';
import withUserContext from '../lib/withUserContext';
import LoadingBar from './LoadingBar';
import ErrorMessage from './ErrorMessage';

const ALL_USERS_QUERY = gql`
  query ALL_USERS_QUERY {
    users {
      id
      name
      email
      numberOfPost
      numberOfComments
    }
  }
`;

const LeftSideBar = () => (
  <Query query={ALL_USERS_QUERY}>
    {({ data, loading, error }) => {
      // if (loading) return <i className="spinner icon"></i>;
      if (loading) return <LoadingBar count={3}/>;
      if (error) return (<ErrorMessage error={'Ошибка! Отсутствует соединение с базой данных'}/>);
      if ((typeof data === 'undefined') || (data.users.length === 0)) return null;
      // console.log('LeftSideBar data: ', data);
      const { users } = data;
      const totalPosts = users.reduce((sum, item) => sum + item.numberOfPost, 0);
      const totalComments = users.reduce((sum, item) => sum + item.numberOfComments, 0);
      return (
        <>
          <Segment>Зарегистрировано пользователей: {data.users.length}</Segment>
          <Segment>Постов на сайте: {totalPosts}</Segment>
          <Segment>Комментариев на сайте: {totalComments}</Segment>
        </>
      );
    }}
  </Query>
);

export { ALL_USERS_QUERY };
export default withUserContext(LeftSideBar);
