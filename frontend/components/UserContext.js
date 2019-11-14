import React, { Component } from 'react';

const { Provider, Consumer } = React.createContext();
// import UserContext from './UserContext';

class UserContext extends Component {
  state = {
    user: null,
  };

  setCurrentUser = (user) => {
    this.setState(
      {
        user: { ...user },
      },
    );
  }

  render() {
    return (
      <Provider
        value={{ user: this.state.user, setCurrentUser: this.setCurrentUser }}
      >
        {this.props.children}
      </Provider>
    );
  }
}

// export default UserContext;
export { UserContext, Consumer as UserContextConsumer };
