import React, { Component } from 'react';
import styled from 'styled-components';
import {
  Grid, Segment, Image, Icon,
} from 'semantic-ui-react';
import Sticky from 'react-stickynode';
import withUserContext from '../lib/withUserContext';
import Spinner from './Spinner';
import ProfileSidebar from './ProfileSidebar';

const Inner = styled.div`
  {/*padding: 2rem;*/}
`;


class RightSideBar extends Component {
  render() {
    console.log('RightSideBar props: ', this.props);
    const user = this.props.user ? this.props.user : {
      id: '',
      name: '',
      email: ''};
  return (
    <Inner>
      <Sticky enabled top={20}>
        <ProfileSidebar user={user} />
      </Sticky>       
    </Inner>
    );
}
};

export default withUserContext(RightSideBar);
