import withApollo from 'next-with-apollo';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { onError } from 'apollo-link-error';
import { ApolloLink } from 'apollo-link';
import { endpoint, prodEndpoint } from '../config';
//import { LOCAL_STATE_QUERY, TOGGLE_CART_MUTATION } from '../components/Cart';

//const createClient = new ApolloClient({
function createClient() {
    return new ApolloClient({
  link: ApolloLink.from([
    onError(({ graphQLErrors, networkError }) => {
      if (graphQLErrors)
        graphQLErrors.forEach(({ message, locations, path }) =>
          console.log(
            `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
          ),
        );
      if (networkError) console.log(`[Network error]: ${networkError}`);
    }),
    new HttpLink({
      uri: endpoint,
      credentials: 'include'
    })
  ]),
  cache: new InMemoryCache()
});
}
export default withApollo(createClient);
