import React, { Component } from 'react';
import { Mutation, Query, ApolloConsumer } from 'react-apollo';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {
  Grid, Segment, Form, Icon, TextArea, Button, Header, Message,
} from 'semantic-ui-react';
import Router from 'next/router';
import { COMMENTS_BY_POST_QUERY } from './CommentList';
import User, { CURRENT_USER_QUERY } from './User';
import { POST_QUERY } from './Post';
// import { Message, Segment, , Icon, Form, , Label} from 'semantic-ui-react';


const CREATE_COMMENT_MUTATION = gql`
  mutation CREATE_COMMENT_MUTATION(
    $userId: String!
    $postId: String!
    $content: String!
  ) {
    createComment(
      userId: $userId
      postId: $postId
      content: $content
      ) {
        id
        postId
        userId
        content
        createdDate
    }
  }
`;

const CommentCreateDiv = styled.div`
  /* form > div.field.comment-content > textarea {
    font-size: 1.5em;
    border: none;
    /* padding: 0.5em; */
    /* height: auto;
    max-height: 100%;
    resize: none;
  }*/
`;


class CommentCreateForm extends Component {
  static propTypes = {
    // postId: PropTypes.string.isRequired,
    post: PropTypes.object.isRequired,
    userId: PropTypes.string.isRequired,
    // title: PropTypes.string,
    // content: PropTypes.string,
    // createdDate: PropTypes.string,
  };

  state = {
    commentItem: {
      userId: this.props.userId,
      postId: this.props.post.id,
      content: '',
    },
    readOnly: false,
    showEdit: '',
  };


  handleChange = (e, data) => {
    const { name, type, value } = e.target;
    // console.log('handleChange: e: ', e);
    // console.log('handleChange: data: ', data);
    console.log(
      `handleChange: name: ${name}, type: ${type}, value: ${value}`,
    );

    const val = value;
    const nam = name;


    const { commentItem } = this.state;
    commentItem[nam] = val;
    this.setState({ commentItem });
  };

    createPostItem = async (e, createComment) => {
      e.preventDefault();
      // const { me } = client.readQuery({ query: CURRENT_USER_QUERY });
      // console.log('createPostItem e: ', e);
      // console.log('createPostItem readQuery me.id: ', me.id);
      console.log('createPostItem createComment this.state: ', this.state);
      const { userId, postId, content } = this.state.commentItem;
      console.log(
        'CommentCreateForm createComment this.state.commentItem: ',
        this.state.commentItem,
      );
      // console.log(
      //   'CommentCreateForm createComment postId: ', postId,
      // );
      const res = await createComment({
        variables: {
        // userId: me.id, title, content
          userId, postId, content,
        },
        refetchQueries: [
        {
          query: COMMENTS_BY_POST_QUERY,
          variables: { id: postId },
        },
        {
          query: POST_QUERY,
          variables: { id: postId },
        },
        {
          query: CURRENT_USER_QUERY,
        }
        ],
      });
      // TO-DO update feed after adding new post
      console.log('CommentCreateForm CREATED!!!! res: ', res.data.createComment);
      // const { id } = res.data.createComment;
      this.setState({
      // commentItem: this.props.commentItem,
        commentItem: {
          userId: '',
          postId: '',
          content: '',
          createdDate: '',
        },
        showEdit: '',
        readOnly: true,
      });
    };

    render() {
      console.log('CommentCreateForm render -> props', this.props);
      console.log('CommentCreateForm render -> state', this.state);
      console.log('CommentCreateForm render -> props.post.id: ', this.props.post.id);
      const {
        commentItem,
        // showCreate,
        // readOnly,
        // showEdit,
      } = this.state;
      console.log('CommentCreateForm render -> state.commentItem', commentItem);
      return (
      <Mutation
        mutation={CREATE_COMMENT_MUTATION}
        variables={{
          commentItem,
        }}
        // refetchQueries={() => ['ALL_POSTS_QUERY']}
      >
        {(createComment, { loading, error }) => {
          if (error) {
            return (
            <Message negative>
              <Message.Header>Ошибка!</Message.Header>
              <p>{error.message.replace('GraphQL error: ', '')}</p>
            </Message>);
          }
          return (
            <CommentCreateDiv>
              {/* <Segment padded> */}
                <Form
                  className='form-comment'
                  onSubmit={(e) => this.createPostItem(e, createComment)
                  }
                  loading={loading}
                  // error={<Error error={error} />}
                  // error
                >
                  {/* </Form.Group> */}
                  {/* <Form.Input
                    fluid
                    name="content"
                    readOnly={readOnly}
                    disabled={loading}
                    loading={loading}
                    defaultValue={commentItem.content}
                    onChange={this.handleChange}
                    // width={8}
                    required
                  /> */}

                  <Form.TextArea
                      className='comment-content'
                      name="content"
                      // readOnly={readOnly}
                      disabled={loading}
                      // loading={loading}
                      placeholder="Комментарий"
                      defaultValue={commentItem.content}
                      onChange={this.handleChange}
                    />

                  {/* <Form.Button
                    floated="right"
                    icon
                    labelPosition="left"
                    onClick={() => this.createPostItem(createComment)}
                  >
                    <Icon name="plus circle" /> Добавить пост
                  </Form.Button> */}
                  <Button
                    type="submit"
                    loading={loading}
                    fluid
                    icon
                    labelPosition="left"
                    // onClick={() => this.createPostItem(createComment)}
                  >
                    Добавить комментарий
                  </Button>
                </Form>
              {/* </Segment> */}
            </CommentCreateDiv>
          );
        }}
      </Mutation>
      );
    }
}

export default CommentCreateForm;
