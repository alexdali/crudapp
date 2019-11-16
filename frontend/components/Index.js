import React from 'react';
import { Query, graphql } from 'react-apollo';
import gql from 'graphql-tag';
import styled from 'styled-components';
import {
  Grid, Segment, Image, Icon,
} from 'semantic-ui-react';
import Spinner from './Spinner';
// import UserContext from './UserContext';
import PostList from './PostList';
import ProfileSidebar from './ProfileSidebar';
import User, { CURRENT_USER_QUERY } from './User';

const IndexDiv = styled.div`
  margin: 52px 0 0;
`;

const Index = (props) => {
  console.log('Main props: ', props);
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
};

// const Index = withCurrentUserQuery(Main);

export default Index;
