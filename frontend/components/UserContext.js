import React, { Component } from 'react';
import { Query, graphql } from 'react-apollo';
import gql from 'graphql-tag';

const { Provider, Consumer } = React.createContext();
// import UserContext from './UserContext';


const withCurrentUserQuery = graphql(gql`
  query {
    me {
      id
      email
      name
    }
  }
`, {
  options: { fetchPolicy: 'cache-only' },
  props: async ({ data, error, loading }) => {
  // props: (payload) => {
    // console.log('withCurrentUserQuery  payload: ', payload);
    // return payload;
    // if (loading || !data.me) return undefined;
    // console.log('withCurrentUserQuery  data: ', data);
    let user = null;
    console.log('withCurrentUserQuery  data.me: ', data.me);
    if (typeof data.me !== 'undefined') {
      user = data.me;
      return user;
    }
    // const user = data.me !== 'undefined' ? null : data.me;
    return user;
  },
});

class UserState extends Component {
  state = {
    user: this.props.user,
  };

  componentDidUpdate(prevProps) {
    // console.log('UserState componentDidUpdate prevProps.user: ', prevProps.user);
    // console.log('UserState componentDidUpdate this.props.user: ', this.props.user);
    if (typeof this.props.user !== 'undefined') {
      if (prevProps.user.id !== this.props.user.id) {
        this.setState({ user: this.props.user });
      }
    }
  }

  // componentDidMount = () => {
  //   console.log('componentDidMount  this.props.user: ', this.props.user);
  //   const user = this.props;
  //   if (user === {}) {
  //     this.setState({
  //       user,
  //     });
  //   }
  // };

  setCurrentUser = (user) => {
    if (user) {
      this.setState({
        user,
      });
    }
  }

  render() {
    console.log('UserContext render this.state.user: ', this.state.user);
    return (
      <Provider
        value={{ user: this.state.user, setCurrentUser: this.setCurrentUser }}
      >
        {this.props.children}
      </Provider>
    );
  }
}

const UserContext = withCurrentUserQuery(UserState);

export { Consumer as UserContextConsumer };
export default UserContext;
