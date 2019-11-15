import { Query, graphql, ApolloConsumer } from 'react-apollo';

import gql from 'graphql-tag';
import PropTypes from 'prop-types';

const CURRENT_USER_QUERY = gql`
  query {
    me {
      id
      email
      name
    }
  }
`;

// const withUserQueryCache = graphql(gql`
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
//     console.log('withUserQueryCache  data.me: ', data.me);
//     if (typeof data.me !== 'undefined') {
//       user = data.me;
//       return user;
//     }
//     // const user = data.me !== 'undefined' ? null : data.me;
//     return user;
//   },
// });


// const Child = (props) => (user) => props.children(user);
// const UserFromCache = (props) => (
//   <Query
//     {...props}
//     query={CURRENT_USER_QUERY}
//     fetchPolicy={'cache-only'}
//   >
//     {({ data, error, loading, client}) => {
//       let user = null;
//       loading
//              ? user= null
//              :
//                (user = data.me ? typeof data.me !== 'undefined' ? data.me : null;
//                 //console.log('UserFromCache  Query data.me: ', data.me);
//                // if (typeof data.me !== 'undefined') user = data.me;


//       // console.log('UserFromCache  Query data.me: ', data.me);
//       // if (typeof data.me !== 'undefined') user = data.me;
//       return props.children(user);
//     }}
//   </Query>
// );

const UserFromCache = (props) => (
  <ApolloConsumer {...props}>
      { (client) => {
        const user = client.query({
          query: CURRENT_USER_QUERY,
          fetchPolicy: 'cache-only',
        }).then(
          {/* ({ data, loading }) => {
            let result = null;
            console.log('UserFromCache ApolloConsumer data: ', data);
            if (typeof data.me !== 'undefined') {
              console.log('UserFromCache ApolloConsumer data.me: ', data.me);
              result = data.me;
            }
            // return null;
            return result; */},
          // ({ data, loading }) => return { data: { me } } ? me : null;
          // if (typeof data.me !== 'undefined') return data.me;
          ({ data, loading }) => {
            let result = null;
            console.log('UserFromCache ApolloConsumer data: ', data);
            if (typeof data.me !== 'undefined') {
              console.log('UserFromCache ApolloConsumer data.me: ', data.me);
              result = data.me;
            }
            return result;
          },

        ).catch((error) => {
          console.log('error: ', error);
          return null;
        });
        console.log('UserFromCache ApolloConsumer user: ', user);
        return props.children(user);
      }
      }
  </ApolloConsumer>
);

UserFromCache.propTypes = {
  children: PropTypes.func.isRequired,
};

// const UserFromCache = withUserQueryCache(Child);

// export default UserFromCache;
export default UserFromCache;
