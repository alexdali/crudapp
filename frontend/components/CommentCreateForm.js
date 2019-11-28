import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import { Form, Button, Message } from 'semantic-ui-react';
import { COMMENTS_BY_POST_QUERY, POST_QUERY } from './CommentsPostQueries';
import { CURRENT_USER_QUERY } from './User';

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
    const val = value;
    const nam = name;

    const { commentItem } = this.state;
    commentItem[nam] = val;
    this.setState({ commentItem });
  };

    createPostItem = async (e, createComment) => {
      e.preventDefault();
      const { userId, postId, content } = this.state.commentItem;
      const res = await createComment({
        variables: {
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
          },
        ],
      });
      // TO-DO handle key press: Enter
      this.setState({
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
      const { commentItem } = this.state;
      return (
      <Mutation
        mutation={CREATE_COMMENT_MUTATION}
        variables={{
          commentItem,
        }}
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
            <div>
                <Form
                  className='form-comment'
                  onSubmit={(e) => this.createPostItem(e, createComment)
                  }
                  loading={loading}
                  // error
                >

                  <Form.TextArea
                      className='comment-content'
                      name="content"
                      disabled={loading}
                      placeholder="Комментарий"
                      value={commentItem.content}
                      onChange={this.handleChange}
                    />

                  <Button
                    type="submit"
                    loading={loading}
                    fluid
                    icon
                    labelPosition="left"
                  >
                    Добавить комментарий
                  </Button>
                </Form>
            </div>
          );
        }}
      </Mutation>
      );
    }
}

export default CommentCreateForm;
