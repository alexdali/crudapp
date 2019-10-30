import React, { Component } from 'react';
import dynamic from 'next/dynamic'
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import styled from 'styled-components';
import Item from './PostCard';
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

const ALL_POSTS_QUERY = gql`
  query ALL_POSTS_QUERY {
    posts {
      id
      title
      userId
      content
      createdDate
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

// const DynamicComponentWithNoSSR = dynamic(
//   () => import('../components/Item'),
//   { ssr: false }
// )

class Items extends Component {
  render() {
    // console.log('Items component this.props', this.props);
    return (
      <Center>
        {/* <Pagination page={this.props.page} /> */}
        <Query
          query={ALL_POSTS_QUERY}
        >
          {({ data, error, loading }) => {
            if (loading) return <p>Загрузка...</p>;
            if (error) return <p>Error: {error.message}</p>;
            return (
              <ItemsList>
                {data.posts.map(post => (
                  <Item item={post} key={post.id} />
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
