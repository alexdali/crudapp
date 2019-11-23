import App, { Container } from 'next/app';
import { ApolloProvider } from 'react-apollo';
import UserContext from '../components/UserContext';
import Page from '../components/Page';
// import Index from '../components/Index';
import { CURRENT_USER_QUERY } from '../components/User';
import { ALL_USERS_QUERY } from '../components/LeftSideBar';
import CreateApolloClient from '../lib/CreateApolloClient';

// const { Provider, Consumer } = React.createContext();

const client = CreateApolloClient({
  ssrForceFetchDelay: 100,
});

const queryUserSubscription = client.watchQuery({
  query: CURRENT_USER_QUERY,
});
const queryAuthorsSubscription = client.watchQuery({
  query: ALL_USERS_QUERY,
});

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }
    // this exposes the query to the user
    pageProps.query = ctx.query;
    return { pageProps };
  }

  state = {
    user: null,
    authors: null,

  };

  componentDidMount() {
    queryUserSubscription.subscribe({
      next: ({ data }) => {
        console.log('_app componentDidMount queryUserSubscription data: ', data);
        if (data.me !== 'undefined') { this.setState({ user: data.me }); }
      },
      error: (e) => console.error(e),
    });
    queryAuthorsSubscription.subscribe({
      next: ({ data }) => {
        console.log('_app componentDidMount queryAuthorsSubscription data: ', data);
        if (data.users !== 'undefined') { this.setState({ authors: data.users }); }
      },
      error: (e) => console.error(e),
    });
  }

  componentWillUnmount() {
    queryUserSubscription.unsubscribe();
    queryAuthorsSubscription.unsubscribe();
    console.log('_app componentWillUnmount Subscription.unsubscribe');
  }
  // setCurrentUser = (user)=>{
  //   this.setState(
  //     {
  //       user: {...user}
  //     });
  // }

  render() {
    // const { Component, apollo, pageProps } = this.props;
    const { Component, pageProps } = this.props;
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
        <ApolloProvider client={client}>
          <UserContext.Provider value={{ user, authors }}>
            <Page>
              <Component {...pageProps}/>
            </Page>
            </UserContext.Provider>
        </ApolloProvider>
    );
  }
}

export { client as apolloClient };
export default MyApp;
