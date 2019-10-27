import React, { Component } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import styled from 'styled-components';
import Item from './Item';
//import Pagination from './Pagination';
//import { perPage } from '../config';

const ALL_USERS_QUERY = gql`
  query ALL_USERS_QUERY {
    users {
      id
      firstName
      lastName
    }
  }
`;

const Center = styled.div`
  text-align: center;
`;

const ItemsList = styled.div`
  /* display: grid; */
  display: block;
  /* grid-template-columns: 1fr 1fr;
  grid-gap: 60px; */
  max-width: ${props => props.theme.maxWidth};
  margin: 2.5rem 3rem;
  padding: 0 4em;
  @media (max-width: 700px) {
    margin: 2.5rem 1rem;
  }
`;

class Items extends Component {
  render() {
    // console.log('Items component this.props', this.props);
    return (
      <Center>
        {/* <Pagination page={this.props.page} /> */}
        <Query
          query={ALL_USERS_QUERY}
        >
          {({ data, error, loading }) => {
            if (loading) return <p>Загрузка...</p>;
            if (error) return <p>Error: {error.message}</p>;
            return (
              <ItemsList>
                {data.users.map(user => (
                  <Item item={user} key={user.id} />
                ))}
              </ItemsList>
            );
          }}
        </Query>
        {/* <Pagination page={this.props.page} /> */}
      </Center>
    );
  }
}

export default Items;
export { ALL_USERS_QUERY };
