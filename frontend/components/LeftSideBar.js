import React, { Component, createRef } from 'react';
import { Query, graphql } from 'react-apollo';
import gql from 'graphql-tag';
import styled from 'styled-components';
import {
  Grid, Segment, Image, Icon, Sticky, Rail, Ref
} from 'semantic-ui-react';
import withUserContext from '../lib/withUserContext';
import Spinner from './Spinner';
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

class LeftSideBar extends Component {
    render() {
    console.log('LeftSideBar props: ', this.props);
    return (
      <Query query={ALL_USERS_QUERY}>
      {({ data, loading, error }) => {
        if (loading) return <i className="spinner icon"></i>;
        if (error) return (<ErrorMessage error={'Ошибка! Отсутствует соединение с базой данных'}/>);
        if ((typeof data === 'undefined') || (data.users.length === 0)) return null;
        console.log('LeftSideBar data: ', data);
        const { users } = data;
        const totalPosts = users.reduce((sum, item) => sum + item.numberOfPost, 0);
        const totalComments = users.reduce((sum, item) => sum + item.numberOfComments, 0);
        // console.log('Index User Query user: ', user);
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
  }
}

export { ALL_USERS_QUERY };
export default withUserContext(LeftSideBar);
