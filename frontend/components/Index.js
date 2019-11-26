import React, { Component } from 'react';
import { withApollo } from '@apollo/react-hoc';
import { Grid } from 'semantic-ui-react';
import Sticky from 'react-stickynode';
import UserContext from '../components/UserContext';
import { CURRENT_USER_QUERY } from '../components/User';
import { ALL_USERS_QUERY } from '../components/LeftSideBar';
// import withUserContext from '../lib/withUserContext';
import Main from './Main';
import LeftSideBar from './LeftSideBar';

// TO-DO replace react-stickynode: old method componentWillReceiveProps

// const Index = () => (
//       <Grid celled='internally'>
//         <Grid.Row>
//           <Grid.Column width={3}>
//             <Sticky enabled top={20}>
//               <LeftSideBar />
//             </Sticky>
//           </Grid.Column>
//           <Grid.Column width={13}>
//             <Main />
//           </Grid.Column>
//         </Grid.Row>
//       </Grid>
// );


  class Index extends Component {
  state = {
    user: null,
    authors: null,

  };

  subscriptionUser() {
    return this.props.client.watchQuery({
      query: CURRENT_USER_QUERY,
    }).subscribe({
      next: ({ data }) => {
        console.log('_app componentDidMount queryUserSubscription data: ', data);
        if (data.me !== 'undefined') { this.setState({ user: data.me }); }
      },
      error: (e) => console.error(e),
    });
  }

  subscriptionAuthors() {
    return this.props.client.watchQuery({
      query: ALL_USERS_QUERY,
    }).subscribe({
      next: ({ data }) => {
        console.log('_app componentDidMount queryAuthorsSubscription data: ', data);
        if (data.users !== 'undefined') { this.setState({ authors: data.users }); }
      },
      error: (e) => console.error(e),
    });
  }

  componentDidMount() {
    // queryUserSubscription.subscribe({
    //   next: ({ data }) => {
    //     console.log('_app componentDidMount queryUserSubscription data: ', data);
    //     if (data.me !== 'undefined') { this.setState({ user: data.me }); }
    //   },
    //   error: (e) => console.error(e),
    // });
    this.subscriptionUser();
    // queryAuthorsSubscription.subscribe({
    //   next: ({ data }) => {
    //     console.log('_app componentDidMount queryAuthorsSubscription data: ', data);
    //     if (data.users !== 'undefined') { this.setState({ authors: data.users }); }
    //   },
    //   error: (e) => console.error(e),
    // });
    this.subscriptionAuthors();
  }

  componentWillUnmount() {
    // queryUserSubscription.unsubscribe();
    this.subscriptionUser.unsubscribe();
    // queryAuthorsSubscription.unsubscribe();
    this.subscriptionAuthors.unsubscribe();
    // console.log('_app componentWillUnmount Subscription.unsubscribe');
  }

  render() {
    console.log('_app this.state: ', this.state);
    const user = this.state.user ? this.state.user : {
      id: '',
      name: '',
      email: '',
      numberOfPost: 0,
      numberOfComments: 0,
    };
    const authors = this.state.authors ? this.state.authors : [];
    return (
    <UserContext.Provider value={{ user, authors }}>
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
    </UserContext.Provider>
);
    }
}

export default withApollo(Index);
