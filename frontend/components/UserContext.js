import React, { Component } from 'react';
import { withApollo } from '@apollo/react-hoc';
import { Query, graphql } from 'react-apollo';
import gql from 'graphql-tag';
// import UserContext from './UserContext';
// import UserFromCache from './UserFromCache';
import User, { CURRENT_USER_QUERY } from './User';
import { ALL_POSTS_QUERY } from './PostList';

const { Provider, Consumer } = React.createContext();


// const withCurrentUserQuery = graphql(gql`
//   query {
//     me {
//       id
//       email
//       name
//     }
//   }
// `, {
//   options: {
//     fetchPolicy: 'cache-only',
//     notifyOnNetworkStatusChange: true,
//   },
//   props: async ({ data, error, loading }) => {
//   // props: (payload) => {
//     // console.log('withCurrentUserQuery  payload: ', payload);
//     // return payload;
//     // if (loading || !data.me) return undefined;
//     // console.log('withCurrentUserQuery  data: ', data);
//     let user = null;
//     console.log('withCurrentUserQuery  data.me: ', data.me);
//     if (typeof data.me !== 'undefined') {
//       user = data.me;
//       return user;
//     }
//     // const user = data.me !== 'undefined' ? null : data.me;
//     return user;
//   },
// });

// class UserState extends Component {
class UserState extends Component {
  state = {
    user: this.props.user,
  };

  fetchUser = async () => {
    const { client } = this.props;
    // fetchStarwarsHeroData(id).then(
    //   (result) => setState({ data: result }),
    //   (e) => console.warn('fetch failure', e),
    // );
    // const user = await client.query({
    //   query: CURRENT_USER_QUERY,
    //   fetchPolicy: 'cache-only',
    // });
    //   const user = await client.query({
    //     query: CURRENT_USER_QUERY,
    //     fetchPolicy: 'cache-only',
    //   }).then(
    //     ({ data, loading }) => {
    //       // let result = null;
    //       console.log('UserState fetchUser data: ', data);
    //       if (typeof data.me !== 'undefined') {
    //         console.log('UserState fetchUser data.me: ', data.me);
    //         return data.me;
    //       }
    //       return null;
    //     },
    //   ).catch((error) => {
    //     console.log('error: ', error);
    //     return null;
    //   });

    // const user = client.readQuery({
    //   query: gql`
    //     query {
    //     me {
    //       id
    //       email
    //       name
    //     }
    //   }
    //   `,
    //   variables: {
    //     id: 'dc0b0e2a-3282-42e3-a0cf-4c7510595989',
    //   },
    // });
    // refetchQueries: [ { query: gql(listComments), variables: { id: xxx-xxx-xxx } } ]
    // const user = client.readQuery({
    //   query: CURRENT_USER_QUERY,
    //   refetchQueries: [CURRENT_USER_QUERY],
    // });
    // console.log('UserState fetchUser user: ', user);
    // this.setState({ user });
  };

  componentDidMount() {
    this.fetchUser();
  }

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
    console.log('UserContext this.props: ', this.props);
    console.log('UserContext this.props.client.cache.data.data: ', this.props.client.cache.data.data);
    // return (
    //   <UserFromCache>
    //     {(user) => {
    //       console.log('UserContext  UserFromCache user: ', user);
    //       return (<Provider
    //         value={{ user: this.state.user, setCurrentUser: this.setCurrentUser }}
    //       >
    //         {this.props.children}
    //       </Provider>);
    //     }
    //     }
    //   </UserFromCache>

    // );
    return (
      <Provider
        value={{ user: this.state.user, setCurrentUser: this.setCurrentUser }}
      >
        {this.props.children}
      </Provider>
    );
  }
}

// const UserContext = withCurrentUserQuery(UserState);
const UserContext = withApollo(UserState);

export { Consumer as UserContextConsumer };
export default UserContext;
