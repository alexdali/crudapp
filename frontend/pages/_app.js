import App, { Container } from 'next/app';
import { ApolloProvider, ApolloConsumer } from 'react-apollo';
// import UserContext from '../components/UserContext';
import UserContext from '../components/UserContext';
import Page from '../components/Page';
// import withData from '../lib/withData';
import CreateApolloClient from '../lib/CreateApolloClient';

const client = CreateApolloClient();

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

  // state = {
  //   user: null
  // };

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
          <UserContext>
            <Page>
                  <Component {...pageProps} />
            </Page>
          </UserContext>
        </ApolloProvider>

    /* </UserContext.Provider> */
    );
  }
}

// export default withData(MyApp);
export default MyApp;
