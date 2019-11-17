//import { UserContextConsumer } from '../components/UserContext';
import UserContext from '../components/UserContext';

// export default function withCurrentUser(Component) {
export default function withUserContext(Component) {
  return function ConnectedComponent(props) {
    return (
      <UserContext.Consumer>
        {/* {({ user, setCurrentUser }) =>
          <Component {...props} user={user} setCurrentUser={setCurrentUser}/>} */}
          {({ user }) =>
          <Component {...props} user={user} />}
      </UserContext.Consumer>
    );
  }
}