import React, { Component } from 'react';
import { Mutation, Query, ApolloConsumer } from 'react-apollo';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {
  Grid, Segment, Form, Icon, TextArea, Button, Header,
} from 'semantic-ui-react';
import { ALL_POSTS_QUERY } from './PostList';
import User, { CURRENT_USER_QUERY } from './User';
import ProfileSidebar from './ProfileSidebar';
import PostCreateForm from './PostCreateForm';
import PostsByUser from './PostsByUser';

const IndexDiv = styled.div`
  margin: 52px 0 0;
`;

const UserBlog = (props) => (
      <Query query={CURRENT_USER_QUERY}>
      {({ data, loading }) => {
        console.log('ALL_POSTS_QUERY data', data);
        return (
          loading ? (
          <div>
            <p>
            Загрузка...
            <i className="spinner icon"></i>
            {/* <Icon loading name="spinner" /> */}
            </p>
          </div>
          )
            : (
              data.me && <IndexDiv>
              <Grid celled='internally'>
                <Grid.Row>
                  {/* <Grid.Column width={3}>
                  </Grid.Column> */}
                  <Grid.Column width={13}>
                  <Header as='h2'>Добавить новый пост</Header>
                  {/* <ApolloConsumer>
                    {client => ( */}
                      <PostCreateForm id={data.me.id}/>
                    {/* )}
                    </ApolloConsumer> */}
                    <IndexDiv>
                    {/* <Segment> */}
                    <Header as='h2'>Все посты блога</Header>
                      <PostsByUser id={data.me.id}/>
                    {/* </Segment> */}
                    </IndexDiv>
                  </Grid.Column>
                  <Grid.Column width={3}>
                    <ProfileSidebar/>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </IndexDiv>
            )
        );
      }}
       </Query>
);

export default UserBlog;
