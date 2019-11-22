import React from 'react';
import { Query } from 'react-apollo';
import { Segment, Image, Icon } from 'semantic-ui-react';
import LoadingBar from './LoadingBar';

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

  /* user.name
            && <>
                <Segment textAlign='center'>
                  <div>
                    <Icon name="user outline" circular size='big' />
                  </div>
                  <div>{user.name}</div>
                </Segment>
                <Segment>Постов на сайте: {user.numberOfPost}</Segment>
                <Segment>Комментариев на сайте: {user.numberOfComments}</Segment>
            </> */

  render() {
    // console.log('ProfileSidebar render props.user: ', this.props.user);
    const user = this.props.user ? this.props.user : {
      id: '',
      name: '',
      email: '',
      numberOfPost: 0,
      numberOfComments: 0,
    };
    const { name } = user;
    return (
        <Segment>
          {
            name ? <>
                <Segment textAlign='center'>
                  <div>
                    <Icon name="user outline" circular size='big' />
                  </div>
                  <div>{user.name}</div>
                </Segment>
                <Segment>Постов на сайте: {user.numberOfPost}</Segment>
                <Segment>Комментариев на сайте: {user.numberOfComments}</Segment>
            </>
              : <LoadingBar count={3}/>
          }
          <Image src='https://react.semantic-ui.com/images/wireframe/paragraph.png' />
          <Image src='https://react.semantic-ui.com/images/wireframe/paragraph.png' />
        </Segment>
    );
  }
}

export default ProfileSidebar;
