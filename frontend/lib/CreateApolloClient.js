// import withApollo from 'next-with-apollo';
import { ApolloClient } from 'apollo-client';
import 'cross-fetch/polyfill';
// import ApolloClient, { InMemoryCache } from 'apollo-boost';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { onError } from 'apollo-link-error';
import { ApolloLink } from 'apollo-link';
import { HttpLink, createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { endpoint, prodEndpoint } from '../config';
// import { LOCAL_STATE_QUERY, TOGGLE_CART_MUTATION } from '../components/Cart';
import User, { CURRENT_USER_QUERY } from '../components/User';

const httpLink = createHttpLink({
  uri: endpoint,
  credentials: 'include',
});

const authLink = setContext((_, { headers }) =>
  // return the headers to the context so httpLink can read them
  ({
    headers: {
      ...headers,
    },
  }));

const cache = new InMemoryCache();

function CreateApolloClient() {
  const client = new ApolloClient({
  // const createClient = new ApolloClient({
  // credentials: 'include',
    cache,
    // resolvers: {},
    resolvers: {
      Mutation: {
        currentUser: (_root, args, { cache }) => {
          // read the cartOpen value from the cache
          const dataCache = cache.readQuery({
            query: CURRENT_USER_QUERY,
          });
          console.log('currentUser cache - data: ', dataCache);
          console.log('currentUser cache - args: ', args);
          const user = args;
          user.__typename = 'currentUser';
          const data = { data: { currentUser: { ...user } } };
          // data.currentUser = { ...dataCache.me };
          cache.writeData(data);
          return null;
        },
      },
    },
    link: ApolloLink.from([
      authLink,
      onError(({ graphQLErrors, networkError }) => {
        if (graphQLErrors) {
          graphQLErrors.forEach(({ message, locations, path }) => console.log(
            `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
          ));
        }
        if (networkError) console.log(`[Network error]: ${networkError}`);
      }),
      httpLink,
    ]),
    // cache: new InMemoryCache(),

  });

  cache.writeData({
    data: {
      currentUser: {
        id: '', name: '', email: '', __typename: '',
      },
    },
  });

  return client;
}

export default CreateApolloClient;
