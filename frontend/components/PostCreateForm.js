import React, { Component } from 'react';
import { Mutation, Query, ApolloConsumer } from 'react-apollo';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {
  Grid, Segment, Form, Icon, TextArea, Button, Header, Message,
} from 'semantic-ui-react';
// import Router from 'next/router';
import { ALL_POSTS_QUERY } from './PostList';
import { POSTS_BY_USER_QUERY } from './PostsByUser';
import User, { CURRENT_USER_QUERY } from './User';


const CREATE_POST_MUTATION = gql`
  mutation CREATE_POST_MUTATION(
    $userId: String!
    $title: String!
    $content: String!
  ) {
    createPost(
      userId: $userId
      title: $title
      content: $content
      ) {
        id
        title
        userId
        content
        createdDate
    }
  }
`;


class PostCreateForm extends Component {
  // static propTypes = {
  //   postItem: PropTypes.shape({
  //     id: PropTypes.string,
  //     userId: PropTypes.string,
  //     title: PropTypes.string,
  //     content: PropTypes.string,
  //     createdDate: PropTypes.string,
  //   }).isRequired,
  // };

  state = {
    postItem: {
      userId: this.props.id,
      // postId: '',
      title: '',
      content: '',
    },
    // showCreate: '',
    readOnly: false,
    showEdit: '',
  };


  handleChange = (e, data) => {
    const { name, type, value } = e.target;
    // console.log('handleChange: data: ', data);
    // console.log(`handleChange: name: ${name}, type: ${type}, value: ${value}, data.checked: ${        data.checked}, data.name: ${data.name}`,);

    const val = value;
    const nam = name;

    const { postItem } = this.state;
    postItem[nam] = val;
    this.setState({ postItem });
  };

  // update: (store, { data: { submitComment } }) => {
  //   // Read the data from our cache for this query.
  //   const data = store.readQuery({ query: CommentAppQuery });
  //   // Add our comment from the mutation to the end.
  //   data.comments = [ ...data.comments, submitComment];
  //   // Write our data back to the cache.
  //   store.writeQuery({ query: CommentAppQuery, data });
  // },
  update = (cache, payload, userId) => {
    // manually update the cache on the client, so it matches the server
    // 1. Read the cache for the posts we want
    console.log('update cache: ', cache);
    console.log('update payload: ', payload);
    const { postsByUser } = cache.readQuery({
      query: POSTS_BY_USER_QUERY,
      variables: {
        id: userId,
      },
    });
    console.log('update postsByUser: ', postsByUser);
    // 2. Push the new post to data
    const newPost = payload.data.createPost;
    // data.posts.push(newPost);
    // data.posts = [...data.posts, newPost];
    // data = { posts: posts.concat([newPost]) };
    // console.log('update after push postsByUser: ', postsByUser);
    // 3. Put the items back!
    cache.writeQuery({
      query: POSTS_BY_USER_QUERY,
      variables: {
        id: userId,
      },
      data: { postsByUser: postsByUser.concat([newPost]) },
    });
  };

    createPostItem = async (e, createPost) => {
      e.preventDefault();
      const { userId, title, content } = this.state.postItem;
      console.log(
        'PostCreateForm createPost this.state.postItem: ',
        this.state.postItem,
      );
      const res = await createPost({
        variables: {
          userId, title, content,
        },
        // update: (cache, payload, userId) => this.update(cache, payload, userId),
        // refetchQueries: [{ query: ALL_POSTS_QUERY, }],
      });
      // TO-DO update feed after adding new post
      console.log('PostCreateForm CREATED!!!! res: ', res.data.createPost);
      const { id } = res.data.createPost;
      this.setState({
        postItem: {
          userId: '',
          title: '',
          content: '',
          createdDate: '',
        },
        showEdit: '',
        readOnly: true,
      },
      () => {
        console.log('PostCreateForm CREATED!!!! res: ', res.data.createPost);
      //   Router.push({
      //     pathname: '/post',
      //     query: { id },
      //   });
      });
    };

    render() {
      console.log('PostCreateForm render -> props', this.props);
      console.log('PostCreateForm render -> state', this.state);
      const {
        postItem,
        readOnly,
        showEdit,
      } = this.state;
      console.log('PostCreateForm render -> state.postItem', postItem);
      return (

      <Mutation
        mutation={CREATE_POST_MUTATION}
        variables={{
          postItem,
        }}
        refetchQueries={() => [{
          query: POSTS_BY_USER_QUERY,
          variables: { id: this.props.id },
        },
        {
          query: ALL_POSTS_QUERY,
        },
        ]
        }
      >
        {(createPost, { loading, error }) => {
          if (error) {
            if (error.message.includes('GraphQL error')) {
              console.log('PostCreateForm Mutation -> error.message', error.message);
              return (
              <Message negative>
                <Message.Header>Ошибка!</Message.Header>
                <p>Нет соединения с базой данных!</p>
              </Message>);
            }
            console.log('PostCreateForm Mutation -> error.message', error.message);
            return (
              <Message negative>
                <Message.Header>Ошибка!</Message.Header>
                <p>{error.message}</p>
              </Message>);
          }
          return (
            <Segment padded>
              <Form
                onSubmit={(e) => this.createPostItem(e, createPost)
                }
                loading={loading}
                // error={<Error error={error} />}
                error
              >
                <Form.Input
                  fluid
                  name="title"
                  readOnly={readOnly}
                  disabled={loading}
                  placeholder="Заголовок поста"
                  // defaultValue={postItem.title}
                  value={postItem.title}
                  onChange={this.handleChange}
                  required
                />

                <Form.TextArea
                  className='post-content'
                  name="content"
                  readOnly={readOnly}
                  disabled={loading}
                  // loading={loading}
                  placeholder="Текст поста"
                  // defaultValue={postItem.content}
                  value={postItem.content}
                  onChange={this.handleChange}
                />

                <Button
                  type="submit"
                  loading={loading}
                  fluid
                  icon
                  labelPosition="left"
                >
                  Добавить пост
                </Button>
              </Form>
            </Segment>
          );
        }}
      </Mutation>
      );
    }
}

export default PostCreateForm;
