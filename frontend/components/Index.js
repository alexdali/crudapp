import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';
import Sticky from 'react-stickynode';
import withUserContext from '../lib/withUserContext';
// import Spinner from './Spinner';
import Main from './Main';
import LeftSideBar from './LeftSideBar';

const Index = () => (
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

export default withUserContext(Index);
