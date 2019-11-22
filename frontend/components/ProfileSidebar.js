import React from 'react';
import { Query } from 'react-apollo';
import { Segment, Image, Icon } from 'semantic-ui-react';
import { CURRENT_USER_QUERY } from './User';

class ProfileSidebar extends React.PureComponent {
  // state = {
  //   user: this.props.user,
  // };

  // componentDidMount() {
  //   //let {user} = this.context;
  //   const user = this.props.user ? this.props.user : {
  //     id: '',
  //     name: '',
  //     email: ''};
  //   this.setState({ user });
  // }

  render() {
    console.log('ProfileSidebar render props.user: ', this.props.user);
    const user = this.props.user ? this.props.user : {
      id: '',
      name: '',
      email: '',
      numberOfPost: 0,
      numberOfComments: 0,
      };
    //const { user } = this.state;
    return (
        <Segment>
          {user.name
            &&
              <> 
                <Segment textAlign='center'>
                  <div>
                    <Icon name="user outline" circular size='big' />
                  </div>
                  <div>{user.name}</div>
                </Segment>
                <Segment>Постов на сайте: {user.numberOfPost}</Segment>
                <Segment>Комментариев на сайте: {user.numberOfComments}</Segment>
              </>
          }
          <Image src='https://react.semantic-ui.com/images/wireframe/paragraph.png' />
          <Image src='https://react.semantic-ui.com/images/wireframe/paragraph.png' />
        </Segment>
    );
  }
}

export default ProfileSidebar;
