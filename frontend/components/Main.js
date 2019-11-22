import React, { Component } from 'react';
import { Query, graphql } from 'react-apollo';
import gql from 'graphql-tag';
import styled from 'styled-components';
import {
  Grid, Segment, Image, Icon,
} from 'semantic-ui-react';
import withUserContext from '../lib/withUserContext';
import Spinner from './Spinner';
import PostList from './PostList';
import User, { CURRENT_USER_QUERY } from './User';

class Main extends Component {
  render() {
    console.log('Main props: ', this.props);
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
