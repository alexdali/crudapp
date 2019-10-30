import React from 'react';
import styled from 'styled-components';
import { Grid, Segment, Image } from 'semantic-ui-react';
import PostList from './PostList';

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
        <Image src='https://react.semantic-ui.com/images/wireframe/image.png' />
          <Image src='https://react.semantic-ui.com/images/wireframe/paragraph.png' />
          <Image src='https://react.semantic-ui.com/images/wireframe/paragraph.png' />
        </Segment>
      </Grid.Column>
    </Grid.Row>
  </Grid>
    </IndexDiv>);
  }
}
