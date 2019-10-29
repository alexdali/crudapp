import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
// import { Button } from 'antd';
import { CURRENT_USER_QUERY } from './User';

const SIGN_OUT_MUTATION = gql`
  mutation SIGN_OUT_MUTATION {
    signout {
      message
    }
  }
`;

const Signout = props => (
  <Mutation
    mutation={SIGN_OUT_MUTATION}
    refetchQueries={[{ query: CURRENT_USER_QUERY }]}
  >
    {/* {signout => props.children(signout)} */}
    {/* {signout => signout} */}
    {/* {signout => <button onClick={signout}>Выйти</button>} */}
    {signout => (
      <span onClick={signout} role="button">
        Выйти
      </span>
    )}
  </Mutation>
);

export default Signout;
export { SIGN_OUT_MUTATION };
