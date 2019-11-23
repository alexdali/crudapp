import UserContext from '../components/UserContext';

export default function withUserContext(Component) {
  return function ConnectedComponent(props) {
    return (
      <UserContext.Consumer>
        {/* {({ user, setCurrentUser }) =>
          <Component {...props} user={user} setCurrentUser={setCurrentUser}/>} */}
          {({ user, authors }) => <Component {...props} user={user} authors={authors} />}
      </UserContext.Consumer>
    );
  };
}
