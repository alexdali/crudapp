import React, { Component } from 'react';
import { Query, graphql } from 'react-apollo';
import gql from 'graphql-tag';
import styled from 'styled-components';
import {
  Grid, Segment, Image, Icon,
} from 'semantic-ui-react';
import withUserContext from '../lib/withUserContext';
import Spinner from './Spinner';
// import { UserContextConsumer } from './UserContext';
import PostList from './PostList';
// import ProfileSidebar from './ProfileSidebar';
import User, { CURRENT_USER_QUERY } from './User';

// const IndexDiv = styled.div`
//   margin: 52px 0 0;
// `;

// const Main = (props) => {
class Main extends Component {
  // queryUserSubscription =() => this.props.client.watchQuery({
  //   query: ALL_POSTS_QUERY,
  // });


  // componentDidMount() {
  //   this.queryUserSubscription.subscribe({
  //     next: ({ data }) => {
  //       console.log('_app componentDidMount queryUserSubscription data: ', data);
  //       if (data.me !== 'undefined') { this.setState({ user: data.me }); }
  //     },
  //     error: (e) => console.error(e),
  //   });
  // }

  // componentWillUnmount() {
  //   this.queryUserSubscription.unsubscribe();
  //   console.log('_app componentWillUnmount queryUserSubscription.unsubscribe');
  // }
  // componentDidMount() {
  //   this.props.setCurrentUser();
  // }

  // componentDidUpdate(prevProps) {
  // console.log('UserState componentDidUpdate prevProps.user: ', prevProps.user);
  // console.log('Main componentDidUpdate this.props.user: ', this.props.user);
  // if (typeof this.props.user !== 'undefined') {
  //   if (prevProps.user.id !== this.props.user.id) {
  //     this.setState({ user: this.props.user });
  //   }
  // }
  // }

  render() {
    console.log('Main props: ', this.props);
    // const { user} = this.props;
    const user = this.props.user ? this.props.user : {
      id: '',
      name: '',
      email: '',
    };
    return (
        <PostList user={user} />
    );
  }
}

export default withUserContext(Main);
