import React from 'react';
import { ApolloConsumer } from 'react-apollo';
import Index from '../components/Index';

const HomePage = (props) =>
// console.log('Index render  this.props: ', props);
// <ApolloConsumer>
//   {client => (
      // <Index client={client} />
      <Index />;
  //     )}
  // </ApolloConsumer>

export default HomePage;
