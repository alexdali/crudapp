import withApollo from 'next-with-apollo';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { onError } from 'apollo-link-error';
import { ApolloLink } from 'apollo-link';
import { HttpLink, createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { endpoint, prodEndpoint } from '../config';
//import { LOCAL_STATE_QUERY, TOGGLE_CART_MUTATION } from '../components/Cart';

const httpLink = createHttpLink({
  uri: endpoint,
  credentials: 'include'
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  //const token = localStorage.getItem('token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      //authorization: token ? `Bearer ${token}` : "",
    }
  }
});

// const authLink = new ApolloLink((operation, forward) => {
//   operation.setContext(({ headers }) => ({ headers: {
//     //authorization: Meteor.userId(), // however you get your token
//     ...headers
//   }}));
//   return forward(operation);
// });

//const createClient = new ApolloClient({
function createClient({ headers }) {
    return new ApolloClient({
      //credentials: 'include',
  link: ApolloLink.from([
    authLink,

    onError(({ graphQLErrors, networkError }) => {
      if (graphQLErrors)
        graphQLErrors.forEach(({ message, locations, path }) =>
          console.log(
            `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
          ),
        );
      if (networkError) console.log(`[Network error]: ${networkError}`);
    }),
    httpLink
    // new HttpLink({
    //   uri: endpoint,
    //   credentials: 'include',
    //  })
  ]),
  cache: new InMemoryCache()
});
}
export default withApollo(createClient);
