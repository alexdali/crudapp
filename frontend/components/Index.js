import React, { Component } from 'react';
import { Query, graphql } from 'react-apollo';
import gql from 'graphql-tag';
import styled from 'styled-components';
import {
  Grid, Segment, Image, Icon,
} from 'semantic-ui-react';
import withCurrentUser from '../lib/withCurrentUser';
import Spinner from './Spinner';
//import { UserContextConsumer } from './UserContext';
import PostList from './PostList';
import ProfileSidebar from './ProfileSidebar';
import User, { CURRENT_USER_QUERY } from './User';

const IndexDiv = styled.div`
  margin: 52px 0 0;
`;

//const Index = (props) => {
class Index extends Component {

  // componentDidMount() {
  //   this.props.setCurrentUser();
  // }

  componentDidUpdate(prevProps) {
    // console.log('UserState componentDidUpdate prevProps.user: ', prevProps.user);
    //console.log('Index componentDidUpdate this.props.user: ', this.props.user);
    // if (typeof this.props.user !== 'undefined') {
    //   if (prevProps.user.id !== this.props.user.id) {
    //     this.setState({ user: this.props.user });
    //   }
    // }
  }

  render() {
    console.log('Index props: ', this.props);
  return (
  // <User>
  //  {({ data, error, loading }) => {
    <Query query={CURRENT_USER_QUERY}>
      {({ data, loading }) => {
        if (data) { console.log('Main data: ', data); }
        if (loading) return <i className="spinner icon"></i>;
        const user = data.me ? data.me : '';
        console.log('Index User Query user: ', user);
        return (
        <IndexDiv>
                <Grid celled='internally'>
                  <Grid.Row>
                    <Grid.Column width={3}>
                    <Segment>1</Segment>
                      <Segment>2</Segment>
                      <Segment>1</Segment>
                      <Segment>2</Segment>
                    </Grid.Column>
                    <Grid.Column width={10}>
                      {/* <PostList user={data.me ? data.me : user} /> */}
                      <PostList user={user} />
                    </Grid.Column>
                    <Grid.Column width={3}>
                      {/* <ProfileSidebar user={data.me ? data.me : user} /> */}
                      <ProfileSidebar user={user} />
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
        </IndexDiv>);
      }}
    </Query>
    // }}
  // </User>
  );
}
};

export default withCurrentUser(Index);
