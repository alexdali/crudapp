import App, { Container } from 'next/app';
import { ApolloProvider, ApolloConsumer } from 'react-apollo';
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

  render() {
    // const { Component, apollo, pageProps } = this.props;
    const { Component, pageProps } = this.props;

    return (
    // <Container>
        <ApolloProvider client={client}>
          <Page>
                <Component {...pageProps} />
          </Page>
        </ApolloProvider>
    // </Container>
    );
  }
}

// export default withData(MyApp);
export default MyApp;
