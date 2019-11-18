import React, { Component } from 'react';
import { Query, graphql } from 'react-apollo';
import gql from 'graphql-tag';
import styled from 'styled-components';
import {
  Grid, Segment, Image, Icon,
} from 'semantic-ui-react';
import withUserContext from '../lib/withUserContext';
import Spinner from './Spinner';
import Main from './Main';
import LeftSideBar from './LeftSideBar';
import RightSideBar from './RightSideBar';
// import PostList from './PostList';
// import ProfileSidebar from './ProfileSidebar';

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
    //const { user} = this.props;
    const user = this.props.user ? this.props.user : {
      id: '',
      name: '',
      email: ''};
  return (
    // <Query query={CURRENT_USER_QUERY}>
    //   {({ data, loading }) => {
    //     if (data) { console.log('Main data: ', data); }
    //     if (loading) return <i className="spinner icon"></i>;
    //     const user = data.me ? data.me : '';
    //     console.log('Index User Query user: ', user);
    //     return (
        <IndexDiv>
          <Grid celled='internally'>
            <Grid.Row>
              <Grid.Column width={3}>
                <LeftSideBar/>
              </Grid.Column>
              <Grid.Column width={10}>
                <Main>{this.props.children}</Main>
              </Grid.Column>
              <Grid.Column width={3}>
                <RightSideBar/>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </IndexDiv>
      );
    //   }}
    // </Query>
  //);
}
};

export default withUserContext(Index);
