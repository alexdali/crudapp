import React from 'react';
import { Query } from 'react-apollo';
import { Segment, Image, Icon } from 'semantic-ui-react';
import { CURRENT_USER_QUERY } from './User';

// const ProfileSidebar = (props) => {
class ProfileSidebar extends React.PureComponent {
  state = {
    user: this.props.user,
  };

  componentDidUpdate(prevProps) {
    // console.log('ProfileSidebar componentDidUpdate prevProps.user: ', prevProps.user);
    // console.log('ProfileSidebar componentDidUpdate this.props.user: ', this.props.user);
    if (prevProps.user.id !== this.props.user.id) {
      this.setState({ user: this.props.user });
    }
  }

  render() {
    console.log('ProfileSidebar render props.user: ', this.props.user);
    // const { user } = this.props;
    const { user } = this.state;
    return (
        <Segment>
          {user.name
            && <Segment textAlign='center'>
              <div><Icon name="user outline" circular size='big' /></div>
                <div>{user.name}</div>
            </Segment>
          }
          {/* <Image src='https://react.semantic-ui.com/images/wireframe/image.png' /> */}
            <Image src='https://react.semantic-ui.com/images/wireframe/paragraph.png' />
            <Image src='https://react.semantic-ui.com/images/wireframe/paragraph.png' />
        </Segment>
    );
  // return (
  //   <Query query={CURRENT_USER_QUERY}>
  //     {({ data, loading }) => (
  //       <Segment>
  //         {loading
  //           ? <i className="spinner icon"></i>
  //           : (data.me
  //           && <Segment textAlign='center'>
  //             <div><Icon name="user outline" circular size='big' /></div>
  //               <div>{data.me.name}</div>
  //           </Segment>
  //           )
  //         }
  //         {/* <Image src='https://react.semantic-ui.com/images/wireframe/image.png' /> */}
  //           <Image src='https://react.semantic-ui.com/images/wireframe/paragraph.png' />
  //           <Image src='https://react.semantic-ui.com/images/wireframe/paragraph.png' />
  //       </Segment>
  //     )}
  //   </Query>);
  }
}

export default ProfileSidebar;
