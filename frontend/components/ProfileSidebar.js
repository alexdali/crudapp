import React from 'react';
// import { Query } from 'react-apollo';
import Router, { withRouter } from 'next/router';
import {
  Segment, Image, Icon, Button,
} from 'semantic-ui-react';
import LoadingBar from './LoadingBar';

class ProfileSidebar extends React.PureComponent {
  // state = {
  //   user: this.props.user,
  // };

   handleClick = () => {
     console.log('ProfileSidebar handleClick');
     Router.push({
       pathname: '/post',
     });
   };

   render() {
     // console.log('ProfileSidebar render props.user: ', this.props.user);
     const { asPath } = this.props.router;
     // console.log('ProfileSidebar render asPath: ', asPath);
     // console.log('ProfileSidebar render this.props: ', this.props);
     const user = this.props.user ? this.props.user : {
       id: '',
       name: '',
       email: '',
       numberOfPost: 0,
       numberOfComments: 0,
     };
     const { name } = user;
     if (typeof this.props.user === 'undefined' || this.props.user === null) return <LoadingBar count={3}/>;
     return (
        <Segment>
          {name && <>
            <Segment textAlign='center'>
              <div>
                <Icon name="user outline" circular size='big' />
              </div>
              <div>{user.name}</div>
            </Segment>
            <Segment>Постов на сайте: {user.numberOfPost}</Segment>
            <Segment>Комментариев на сайте: {user.numberOfComments}</Segment>
          </>}
          <Image src='https://react.semantic-ui.com/images/wireframe/paragraph.png' />
          <Image src='https://react.semantic-ui.com/images/wireframe/paragraph.png' />
          {(asPath !== '/post' && name) && <Segment>
            <Button
            fluid
            onClick={this.handleClick}
            >
              Добавить пост
            </Button>
          </Segment>}
        </Segment>
     );
   }
}

export default withRouter(ProfileSidebar);
