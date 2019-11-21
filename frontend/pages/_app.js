import App, { Container } from 'next/app';
import { ApolloProvider, ApolloConsumer } from 'react-apollo';
import UserContext from '../components/UserContext';
import Page from '../components/Page';
// import Index from '../components/Index';
import { CURRENT_USER_QUERY } from '../components/User';
import CreateApolloClient from '../lib/CreateApolloClient';

// const { Provider, Consumer } = React.createContext();

// const client = CreateApolloClient();
const client = CreateApolloClient({
  // networkInterface,
  // initialState: window.__APOLLO_STATE__,
  ssrForceFetchDelay: 100,
});

const queryUserSubscription = client.watchQuery({
  query: CURRENT_USER_QUERY,
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

  };

  componentDidMount() {
    queryUserSubscription.subscribe({
      next: ({ data }) => {
        console.log('_app componentDidMount queryUserSubscription data: ', data);
        if (data.me !== 'undefined') { this.setState({ user: data.me }); }
      },
      error: (e) => console.error(e),
    });
  }

  componentWillUnmount() {
    queryUserSubscription.unsubscribe();
    console.log('_app componentWillUnmount queryUserSubscription.unsubscribe');
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

    return (
    // <UserContext.Provider
    //   value={{ user: this.state.user, setCurrentUser: this.setCurrentUser }}
    // >

        <ApolloProvider client={client}>
          {/* <UserContext> */}
          <UserContext.Provider value={{ user: this.state.user }}>
            <Page>
              {/* <Index> */}
                <Component {...pageProps}/>
              {/* </Index> */}
            </Page>
            </UserContext.Provider>
          {/* </UserContext> */}
        </ApolloProvider>

    /* </UserContext.Provider> */
    );
  }
}

// export default withData(MyApp);
// export { Consumer as UserContextConsumer };
// export default UserContext
export { client as apolloClient };
export default MyApp;
