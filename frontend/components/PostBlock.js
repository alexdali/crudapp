import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import { adopt } from 'react-adopt';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import {
  Message, Segment, Button, Icon, Form,
} from 'semantic-ui-react';
import TextareaAutosize from 'react-textarea-autosize';
import Router from 'next/router';
import styled from 'styled-components';
import moment from 'moment';
import withUserContext from '../lib/withUserContext';
import { ALL_POSTS_QUERY } from './PostList';
import { CURRENT_USER_QUERY } from './User';
import CommentBlock from './CommentBlock';


const RowDiv = styled.div`
  div.field.title-view > textarea {
    width: 100%;
    max-height: 100%;
    font-size: 2.5em;
    padding: 0.5em;
    border: none;
    border-bottom: 1px solid rgba(34, 36, 38, 0.15);
    resize: none;
  }
  .post-meta {
    display: flexbox;
    justify-content: space-between;
    font-size: 1.2rem;
    font-weight: 600;
    padding: 1em 2em 0;
    border-bottom: 1px solid rgba(34, 36, 38, 0.15);
  }
  .ui.form > div.field.post-content > textarea {
    font-size: 1.5em;
    border: none;
    max-height: 100%;
    resize: none;
  }
`;

const UPDATE_POST_MUTATION = gql`
  mutation UPDATE_POST_MUTATION(
    $userId: String!
    $postId: String!
    $title: String!
    $content: String!
  ) {
    updatePost(
      userId: $userId
      postId: $postId
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

const DELETE_POST_MUTATION = gql`
  mutation DELETE_POST_MUTATION(
    $postId: String!
    $userId: String!
  ) {
    deletePost(
      postId: $postId
      userId: $userId
      ) {
        message
    }
  }
`;

const UpdateBlock = (props) => {
  const {
    showEdit, enableEdit, updatePostItem, updatePost, loadingUpdate, deletePostItem, deletePost,
  } = props.updateProps;
  return (
    <>
      {showEdit === '' ? (
        <Button.Group basic attached='bottom'>
          <Button
            icon
            size="large"
            onClick={() => enableEdit('1')}
          >
            <Icon name="edit outline" />
          </Button>
          <Button
            icon size="large"
            onClick={() => deletePostItem(deletePost)}
          >
            <Icon name="trash alternate outline" />
          </Button>
        </Button.Group>
      ) : (
        <Segment attached='bottom'>
          <Button
            onClick={() => updatePostItem(updatePost)}
            >
              Обнов{loadingUpdate ? 'ление' : 'ить'}
          </Button>
          <Button onClick={() => enableEdit('')}>Отмена</Button>
        </Segment>
      )}
    </>
  );
};

/* eslint-disable */
const Composed = adopt({
  updatePostMutate: ({render}) => <Mutation mutation={UPDATE_POST_MUTATION}>{render}</Mutation>,
  deletePostMutate: ({render}) => <Mutation mutation={DELETE_POST_MUTATION}>{render}</Mutation>,
});
/* eslint-enable */

class PostBlock extends Component {
  static propTypes = {
    postItem: PropTypes.shape({
      id: PropTypes.string,
      userId: PropTypes.string,
      title: PropTypes.string,
      content: PropTypes.string,
      createdDate: PropTypes.string,
    }).isRequired,
  };

  state = {
    postItem: this.props.postItem,
    authorIsCurrentUser: false,
    readOnly: true,
    showEdit: '',
  };


  componentDidMount() {
    const { postItem, user } = this.props;
    if (user !== null && postItem.userId === user.id) {
      this.setState({
        authorIsCurrentUser: true,
      });
    }
  }

  enableEdit = (val) => {
    if (val === '1') {
      this.setState({
        showEdit: '1',
        readOnly: false,
      });
    } else {
      this.setState({
        showEdit: '',
        readOnly: true,
        postItem: this.props.postItem,
      });
    }
  };

  handleChange = (e, data) => {
    const { name, type, value } = e.target;
    const val = value;
    const nam = name;

    const { postItem } = this.state;
    postItem[nam] = val;
    this.setState({ postItem });
  };

  updatePostItem = async (updatePost) => {
    const { postItem } = this.state;
    const res = await updatePost({
      variables: {
        userId: postItem.userId,
        postId: postItem.id,
        title: postItem.title,
        content: postItem.content,
      },
      refetchQueries: [{
        query: ALL_POSTS_QUERY,
      }],
    });
    this.setState({
      postItem: this.props.postItem,
      showEdit: '',
      readOnly: true,
    });
  };

  deletePostItem = async (deletePost) => {
    const { postItem } = this.state;
    const { user } = this.props;
    const res = await deletePost({
      variables: {
        postId: postItem.id,
        userId: user.id,
      },
      refetchQueries: [{
        query: ALL_POSTS_QUERY,
      },
      {
        query: CURRENT_USER_QUERY,
      }],
    });

    if (res) {
      Router.push({
        pathname: '/post',
      });
    }
  };

  render() {
    const user = this.props.user ? this.props.user : {
      id: '',
      name: '',
      email: '',
    };
    const {
      postItem,
      authorIsCurrentUser,
      readOnly,
      showEdit,
    } = this.state;
    const updateProps = {
      showEdit, enableEdit: this.enableEdit, updatePostItem: this.updatePostItem, deletePostItem: this.deletePostItem,
    };
    return (
      <Composed>
      {({
        updatePostMutate, deletePostMutate,
      }) => {
        const { loading: loadingUpdate, error: errorUpdate } = updatePostMutate;
        updateProps.updatePost = updatePostMutate;
        updateProps.deletePost = deletePostMutate;
        if (errorUpdate) {
          return (
          <Message negative>
            <Message.Header>Ошибка!</Message.Header>
            <p>{errorUpdate.message.replace('GraphQL error: ', '')}</p>
          </Message>);
        }

        return (
          <RowDiv>
            <Segment>
              <Form.Field
                control={TextareaAutosize}
                className='title-view'
                name="title"
                readOnly={readOnly}
                disabled={loadingUpdate}
                defaultValue={postItem.title}
                onChange={this.handleChange}
              />

              <div className="post-meta">
                <p>{postItem.author.name}</p>
                <p>{moment(postItem.createdDate).format('DD MMMM YYYY HH:mm')}</p>
              </div>

              <Form>
                <Form.Field
                  control={TextareaAutosize}
                  className='post-content'
                  name="content"
                  readOnly={readOnly}
                  disabled={loadingUpdate}
                  defaultValue={postItem.content}
                  onChange={this.handleChange}
                  placeholder='Текст поста'
                />
              </Form>
              {
                authorIsCurrentUser
                && <UpdateBlock updateProps={updateProps} />
              }
            </Segment>
            <CommentBlock post={postItem} userId={user.id} />
          </RowDiv>
        );
      }}
      </Composed>
    );
  }
}

export default withUserContext(PostBlock);
