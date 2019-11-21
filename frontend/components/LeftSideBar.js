import React, { Component } from 'react';
import { Query, graphql } from 'react-apollo';
import gql from 'graphql-tag';
import styled from 'styled-components';
import {
  Grid, Segment, Image, Icon,
} from 'semantic-ui-react';
import withUserContext from '../lib/withUserContext';
import Spinner from './Spinner';
import ErrorMessage from './ErrorMessage';
// import User, { CURRENT_USER_QUERY } from './User';

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

// const IndexDiv = styled.div`
//   margin: 52px 0 0;
// `;

// const LeftSideBar = (props) => {
class LeftSideBar extends Component {
  // componentDidMount() {
  //   this.props.setCurrentUser();
  // }

  // componentDidUpdate(prevProps) {
  // console.log('UserState componentDidUpdate prevProps.user: ', prevProps.user);
  // console.log('LeftSideBar componentDidUpdate this.props.user: ', this.props.user);
  // if (typeof this.props.user !== 'undefined') {
  //   if (prevProps.user.id !== this.props.user.id) {
  //     this.setState({ user: this.props.user });
  //   }
  // }
  // }

  render() {
    console.log('LeftSideBar props: ', this.props);
    // const user = this.props.user ? this.props.user : {
    //   id: '',
    //   name: '',
    //   email: '',
    // };
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
            {/* <Segment>2</Segment> */}
          </>
        );
      }}
    </Query>
    );
  }
}

export default withUserContext(LeftSideBar);
