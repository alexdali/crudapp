import React from 'react';
import { Query } from 'react-apollo';
import styled from 'styled-components';
import { Grid, Segment, Image, Icon } from 'semantic-ui-react';
import PostList from './PostList';
import User, { CURRENT_USER_QUERY } from './User';

const IndexDiv = styled.div`
  margin: 52px 0 0;
`;

export default class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  // componentDidMount() {
  // }

  render() {
    return (
      <Query query={CURRENT_USER_QUERY}>
        {({ data, loading }) => {

          return (
    <IndexDiv>
      <Grid celled='internally'>
    <Grid.Row>
      <Grid.Column width={3}>
      <Segment>1</Segment>
        <Segment>2</Segment>
        <Segment>1</Segment>
        <Segment>2</Segment>
      </Grid.Column>
      <Grid.Column width={10}>
      <PostList/>
      </Grid.Column>
      <Grid.Column width={3}>
        <Segment>
        {loading ?
        <i className="spinner icon"></i> :
        (data.me &&
        /* <Segment circular raised style={{width: 100, marginLeft: 10, marginRight: 10}} className="account"> */
        <Segment textAlign='center'>
          <div><Icon name="user outline" circular size='big' /></div>
          <div>{data.me.name}</div>
          </Segment>
        /* </Segment> */
        )
        }
        {/* <Image src='https://react.semantic-ui.com/images/wireframe/image.png' /> */}
          <Image src='https://react.semantic-ui.com/images/wireframe/paragraph.png' />
          <Image src='https://react.semantic-ui.com/images/wireframe/paragraph.png' />
        </Segment>
      </Grid.Column>
    </Grid.Row>
  </Grid>
    </IndexDiv>
          );
  }}
      </Query>
    );
  }
}
