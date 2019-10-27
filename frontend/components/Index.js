import React from 'react';
import styled from 'styled-components';
import Items from './Items';

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
      <Items/>
    </IndexDiv>);
  }
}
