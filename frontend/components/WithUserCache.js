import { Query, graphql } from 'react-apollo';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';

// const CURRENT_USER_QUERY = gql`
//   query {
//     me {
//       id
//       email
//       name
//     }
//   }
// `;

const withUserQuery = graphql(gql`
  query {
    me {
      id
      email
      name
    }
  }
`, {
  options: {
    fetchPolicy: 'cache-only',
    notifyOnNetworkStatusChange: true,
  },
  props: async ({ data, error, loading }) => {
  // props: (payload) => {
    // console.log('withCurrentUserQuery  payload: ', payload);
    // return payload;
    // if (loading || !data.me) return undefined;
    // console.log('withCurrentUserQuery  data: ', data);
    let user = null;
    console.log('withCurrentUserQuery  data.me: ', data.me);
    if (typeof data.me !== 'undefined') {
      user = data.me;
      return user;
    }
    // const user = data.me !== 'undefined' ? null : data.me;
    return user;
  },
});

const User = (props) => (
  <Query {...props} query={CURRENT_USER_QUERY}>
    {(payload) => props.children(payload)}
  </Query>
);

User.propTypes = {
  children: PropTypes.func.isRequired,
};

export default User;
export { CURRENT_USER_QUERY };
