import React, { Component } from 'react';
// import { Query, graphql } from 'react-apollo';
// import gql from 'graphql-tag';
import styled from 'styled-components';
import {
  Grid, Segment, Image, Icon,
} from 'semantic-ui-react';
import withUserContext from '../lib/withUserContext';
import Spinner from './Spinner';
import ProfileSidebar from './ProfileSidebar';
// import User, { CURRENT_USER_QUERY } from './User';

// const IndexDiv = styled.div`
//   margin: 52px 0 0;
// `;
const Inner = styled.div`
  {/*padding: 2rem;*/}
`;

//consRightftSideBar = (props) => {
class RightSideBar extends Component {

  // componentDidMount() {
  //   this.props.setCurrentUser();
  // }

  componentDidUpdate(prevProps) {
    // console.log('UserState componentDidUpdate prevProps.user: ', prevProps.user);
    //consRightlog('LeftSideBar componentDidUpdate this.props.user: ', this.props.user);
    // if (typeof this.props.user !== 'undefined') {
    //   if (prevProps.user.id !== this.props.user.id) {
    //     this.setState({ user: this.props.user });
    //   }
    // }
  }

  render() {
    console.log('RightSideBar props: ', this.props);
    //const { user} = this.props;
    const user = this.props.user ? this.props.user : {
      id: '',
      name: '',
      email: ''};
  return (
    <Inner>
      <ProfileSidebar user={user} />
    </Inner>
    );
}
};

export default withUserContext(RightSideBar);
