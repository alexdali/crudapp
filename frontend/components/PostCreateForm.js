import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import {
  Segment, Form, Button, Message,
} from 'semantic-ui-react';
import styled from 'styled-components';
import { ALL_POSTS_QUERY } from './PostList';
import { POSTS_BY_USER_QUERY } from './PostsByUser';
import { CURRENT_USER_QUERY } from './User';

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

const RowDiv = styled.div`
  .ui.form > div.field.post-content > textarea {
    resize: none;
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
      title: '',
      content: '',
    },
    readOnly: false,
    showEdit: '',
  };


  handleChange = (e, data) => {
    const { name, type, value } = e.target;
    const val = value;
    const nam = name;

    const { postItem } = this.state;
    postItem[nam] = val;
    this.setState({ postItem });
  };

    createPostItem = async (e, createPost) => {
      e.preventDefault();
      const { userId, title, content } = this.state.postItem;
      const res = await createPost({
        variables: {
          userId, title, content,
        },
        refetchQueries: [{
          query: POSTS_BY_USER_QUERY,
          variables: { id: this.props.id },
        },
        {
          query: ALL_POSTS_QUERY,
        },
        {
          query: CURRENT_USER_QUERY,
        }],
      });
      this.setState({
        postItem: {
          userId: '',
          title: '',
          content: '',
          createdDate: '',
        },
        showEdit: '',
        readOnly: true,
      });
    };

    render() {
      const {
        postItem,
        readOnly,
      } = this.state;
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
              return (
              <Message negative>
                <Message.Header>Ошибка!</Message.Header>
                <p>Нет соединения с базой данных!</p>
              </Message>);
            }
            return (
              <Message negative>
                <Message.Header>Ошибка!</Message.Header>
                <p>{error.message}</p>
              </Message>);
          }
          return (
            <RowDiv>
            <Segment padded>
              <Form
                onSubmit={(e) => this.createPostItem(e, createPost)
                }
                loading={loading}
                error
              >
                <Form.Input
                  fluid
                  name="title"
                  readOnly={readOnly}
                  disabled={loading}
                  placeholder="Заголовок поста"
                  value={postItem.title}
                  onChange={this.handleChange}
                  required
                />

                <Form.TextArea
                  className='post-content'
                  name="content"
                  readOnly={readOnly}
                  disabled={loading}
                  placeholder="Текст поста"
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
            </RowDiv>
          );
        }}
      </Mutation>
      );
    }
}

export default PostCreateForm;
