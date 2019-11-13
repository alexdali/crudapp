import React, { Component } from 'react';
import UserContext from './UserContext';

class CurrentUser extends Component {
  state = {
    user: null,
  };

  setCurrentUser = (user)=>{
    this.setState(
      {
        user: {...user}
      });
  }

  render() {
    return (
      <UserContext.Provider
        value={{ user: this.state.user, setCurrentUser: this.setCurrentUser }}
      >
        {this.props.children}
      </UserContext.Provider>
    );
  }
}

export default CurrentUser;
