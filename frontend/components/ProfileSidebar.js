import React from 'react';
import { Query } from 'react-apollo';
import { Segment, Image, Icon } from 'semantic-ui-react';
import { CURRENT_USER_QUERY } from './User';

const ProfileSidebar = props => {
  return (
    <Query query={CURRENT_USER_QUERY}>
      {({ data, loading }) => {
      return (
        <Segment>
          {loading ?
          <i className="spinner icon"></i> :
           (data.me &&
            <Segment textAlign='center'>
              <div><Icon name="user outline" circular size='big' /></div>
                <div>{data.me.name}</div>
            </Segment>
          )
          }
          {/* <Image src='https://react.semantic-ui.com/images/wireframe/image.png' /> */}
            <Image src='https://react.semantic-ui.com/images/wireframe/paragraph.png' />
            <Image src='https://react.semantic-ui.com/images/wireframe/paragraph.png' />
        </Segment>
      );
      }}
    </Query>
  );
}

export default ProfileSidebar;