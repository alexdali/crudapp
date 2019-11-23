import React, { Component } from 'react';
import withUserContext from '../lib/withUserContext';
import PostList from './PostList';

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
