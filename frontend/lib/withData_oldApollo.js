import withApollo from 'next-with-apollo';
import ApolloClient from 'apollo-boost';
import { endpoint, prodEndpoint } from '../config';
//import { LOCAL_STATE_QUERY, TOGGLE_CART_MUTATION } from '../components/Cart';

function createClient({ headers }) {
  return new ApolloClient({
    // uri: process.env.NODE_ENV === 'development' ? endpoint : prodEndpoint,
    uri: endpoint,
    request: operation => {
      operation.setContext({
        fetchOptions: {
          credentials: 'include',
        },
        headers,
      });
    },
    // local state
    clientState: {
      resolvers: {
        // Mutation: {
        //   toggleCart(_, variables, { cache }) {
        //     // read the cartOpen value from the cache
        //     const { cartOpen } = cache.readQuery({
        //       query: LOCAL_STATE_QUERY,
        //     });
        //     // console.log('cache - ', cache);
        //     // console.log('cartOpen - ', cartOpen);
        //     // console.log('cache.data - ', cache.data);
        //     // write the cart state to the opposite
        //     const data = {
        //       data: { cartOpen: !cartOpen },
        //     };
        //     // write the data variable onto the cache
        //     cache.writeData(data);
        //     // console.log('withData data - ', data);
        //     return data;
        //   },
        // },
      },
      defaults: {
        cartOpen: false,
      },
    },
  });
}

export default withApollo(createClient);
