import React, { Component } from 'react';
import { Mutation, Query, ApolloConsumer } from 'react-apollo';
import gql from 'graphql-tag';
import { adopt } from 'react-adopt';
import PropTypes from 'prop-types';
import { Message, Segment, Button, Icon, Form, TextArea, Label
} from 'semantic-ui-react';
import styled from 'styled-components';
//import NProgress from 'nprogress';
//import CreateFormCategoryTP from './CreateFormCategoryTP';
import PostBlock from "./PostBlock";
import { ALL_POSTS_QUERY } from './PostList';
import User,{ CURRENT_USER_QUERY } from './User';
// import Error from './ErrorMessage';

const RowDiv = styled.div`
  margin: 52px 0px;
  padding: 30px 10px;
  /* border: 1px solid rgba(34, 36, 38, 0.15);
  border-radius: 0.28571429rem; */
  /* box-shadow: 0 1px 2px 0 rgba(34, 36, 38, 0.15); */
  /* .menu-account-info {
    font-family: 'Montserrat Alternates', 'Roboto', 'Open Sans', sans-serif,
      'Arial';
  }
  .segment.segment-bottom {
    display: flex;
    justify-content: space-between;
  }
  input.title-view {
    font-size: 2.5em;
    padding: 0.5em;
    border: none;
    border-bottom: 1px solid rgba(34, 36, 38, 0.15);
  }
  .post-meta {
    display: flexbox;
    justify-content: space-between;
    padding: 1em 2em 0;
    border-bottom: 1px solid rgba(34, 36, 38, 0.15);
  }
  .ui.form textarea.post-content {
    font-size: 1.5em;
    border: none;
    /* padding: 0.5em; */
  } */
`;

const POST_QUERY = gql`
  query POST_QUERY(
    $id: String!
  ) {
    post(id: $id) {
      id
      title
      userId
      content
      createdDate
    }
  }
`;

// /* eslint-disable */
// const Composed = adopt({
//   currentUser: ({render}) => <Query query={CURRENT_USER_QUERY}>{render}</Query>,
//   postQuery: ({render}) => <Query query={POST_QUERY} variables={{ id: props.id }}>{render}</Query>,
//   // signinMutate: ({render}) => <Mutation mutation={SIGNIN_MUTATION}>{render}</Mutation>,
// });
// /* eslint-enable */

const Post = props => {
  console.log('const Post props: ', props);
  return (
    //<User>
      //</User>{({ data: userData, loading: userLoading}) => {
        /* if(userLoading || userData.me === undefined) {const userId = '';}
        else {
          const userId = userData.me.id;
          //const userId = userData.me.id === undefined ? '' : userData.me.id;
        } */
        //const userId = userData === undefined ? '' : (userData.me === undefined ? '' : userData.me);
        //const userId = userData.me.id || '';
        //console.log('query Post userId: ', userId);
        <ApolloConsumer>
          {client => {
            {/* const userData = await client.readQuery({ query: CURRENT_USER_QUERY });
            const userId = userData === undefined ? '' : userData.me.id;
            console.log('query Post userId: ', userId); */}
            return (
              <Query query={POST_QUERY}
                variables={{ id: props.id, }}
              >
                {({ data, loading: loadingQuery }) => {
                  console.log('query Post data: ', data);
                  //console.log('query Post me: ', me);
                  return (
                  loadingQuery ? (
                      <div>
                        <p>
                        Загрузка...
                        <i className="spinner icon"></i>
                        </p>
                      </div>
                    )
                    :
                    (
                      <RowDiv>
                      {/* <MyContext.Consumer>
                        {user =>
                          <PostBlock user={user} postItem={data.post} key={data.post.id} />
                        }

                        </MyContext.Consumer> */}
                        {/* <PostBlock postItem={data.post} key={data.post.id} /> */}
                        <PostBlock postItem={data.post} />
                      </RowDiv>
                    )
                  );
                }}
              </Query>
            );
          }}
        </ApolloConsumer>
      //}}
    //</User>
  )};

export default Post;