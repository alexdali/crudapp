import React, { Component, createRef } from 'react';
import { withApollo } from '@apollo/react-hoc';
import { Query, graphql } from 'react-apollo';
import gql from 'graphql-tag';
import styled from 'styled-components';
import {
  Grid, Segment, Image, Icon, 
} from 'semantic-ui-react';
import Sticky from 'react-stickynode';
import withUserContext from '../lib/withUserContext';
import Spinner from './Spinner';
import Main from './Main';
import LeftSideBar from './LeftSideBar';
import RightSideBar from './RightSideBar';

const IndexDiv = styled.div`
  margin: 52px 0 0;
`;

class Index extends Component {

  render() {
    return (
      <Grid celled='internally'>     
        <Grid.Row>
          <Grid.Column width={3}>        
            <Sticky enabled top={20}>
              <LeftSideBar />
            </Sticky>       
          </Grid.Column>        
          <Grid.Column width={13}>
            <Main />
          </Grid.Column>
        </Grid.Row>        
      </Grid>
    );
  }
}

export default withUserContext(Index);
