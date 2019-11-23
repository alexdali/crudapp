import React, { Component } from 'react';
import styled from 'styled-components';
import Sticky from 'react-stickynode';
import withUserContext from '../lib/withUserContext';
import ProfileSidebar from './ProfileSidebar';

const Inner = styled.div`
`;

class RightSideBar extends Component {
  render() {
    console.log('RightSideBar props: ', this.props);
    const user = this.props.user ? this.props.user : {
      id: '',
      name: '',
      email: '',
    };
    return (
      <Inner>
        <Sticky enabled top={20}>
          <ProfileSidebar user={user} />
        </Sticky>
      </Inner>
    );
  }
}

export default withUserContext(RightSideBar);
