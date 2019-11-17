import { UserContextConsumer } from '../components/UserContext';

export default function withCurrentUser(Component) {
  return function ConnectedComponent(props) {
    return (
      <UserContextConsumer>
        {({ user, setCurrentUser }) =>
          <Component {...props} user={user} setCurrentUser={setCurrentUser}/>}
      </UserContextConsumer>
    );
  }
}