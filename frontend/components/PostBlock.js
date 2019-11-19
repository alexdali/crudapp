import React, { Component } from 'react';
import { Mutation, Query, ApolloConsumer } from 'react-apollo';
import { adopt } from 'react-adopt';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import {
  Message, Segment, Button, Icon, Form, TextArea, Label, Header, Divider,
} from 'semantic-ui-react';
import TextareaAutosize from 'react-textarea-autosize';
import Router from 'next/router';
import styled from 'styled-components';
// import NProgress from 'nprogress';
import withUserContext from '../lib/withUserContext';
import { ALL_POSTS_QUERY } from './PostList';
// import User,{ CURRENT_USER_QUERY } from './User';
import CommentBlock from './CommentBlock';
// import CommentCreateForm from './CommentCreateForm';

const RowDiv = styled.div`
  input.title-view {
    width: 100%;
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
  .ui.form > div.field.post-content > textarea {
    font-size: 1.5em;
    border: none;
    /* padding: 0.5em; */
    /* height: auto; */
    max-height: 100%;
    resize: none;
  }
`;

// const CommentDiv = styled.div`
//   margin: 2.5em 0 0.5em;
//   padding: 0.5em;
//   /*
//   width: 100%;
//   font-size: 2.5em;
//   border: none;
//   border-bottom: 1px solid rgba(34, 36, 38, 0.15);} */
// `;

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
        // <Segment attached='bottom'>
        <Button.Group basic attached='bottom'>
          <Button
            icon
            size="large"
            onClick={() => enableEdit('1')}
          ><Icon name="edit outline" /></Button>
          <Button
            icon size="large"
            onClick={() => deletePostItem(deletePost)}
          ><Icon name="trash alternate outline" /></Button>
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
    currentUserId: '',
    readOnly: true,
    showEdit: '',
    // updated: false,
    // deleted: false,
  };


  componentDidMount() {
    // let {user} = this.context;
    const { postItem, user } = this.props;
    if (user !== null && postItem.userId === user.id) {
      this.setState({
        authorIsCurrentUser: true,
      });
    }
  }

  enableEdit = (val) => {
    console.log('PostBlock enableEdit');
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
    // console.log(`handleChange: e: `, e);
    console.log('handleChange: data: ', data);
    console.log(
      `handleChange: name: ${name}, type: ${type}, value: ${value}, data.checked: ${
        data.checked
      }, data.name: ${data.name}`,
    );

    let val = value;
    let nam = name;

    if (data.name === 'isActive') {
      val = data.checked;
      nam = data.name;
    }

    const { postItem } = this.state;
    postItem[nam] = val;
    this.setState({ postItem });
  };

  updatePostItem = async (updatePost) => {
    // console.log('updatePostItem e: ', e);
    // console.log('PostList updatePostItem this.state: ', this.state);
    const { postItem } = this.state;
    console.log(
      'PostBlock updatePostItem this.state.postItem: ',
      postItem,
    );
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
    console.log('updatePostItem UPDATED!!!! res: ', res);
    // TO-DO update cache
    this.setState({
      postItem: this.props.postItem,
      showEdit: '',
      readOnly: true,
    },
      // this.props.updateBlog(res);
    );
  };

  deletePostItem = async (deletePost) => {
    // console.log('deletePostItem e: ', e);
    // console.log('PostList deletePostItem this.state: ', this.state);
    const { postItem } = this.state;
    const { user } = this.props;
    console.log(
      'PostBlock deletePostItem this.state.postItem: ',
      postItem,
    );
    const res = await deletePost({
      variables: {
        postId: postItem.id,
        userId: user.id,
      },
    });
    console.log('deletePostItem DELETED!!!! res: ', res);
    // TO-DO update cache
    this.setState({
      postItem: '',
      showEdit: '',
      readOnly: true,
    },
    () => {
      // this.props.updateBlog(res);
      Router.push({
        pathname: '/post',
      });
    });
  };

  render() {
    console.log('PostBlock render -> props', this.props);
    console.log('PostBlock render -> state', this.state);
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

    console.log('PostBlock render -> state.postItem: ', postItem);
    console.log('PostBlock render -> this.props.user: ', user);
    const updateProps = {
      showEdit, enableEdit: this.enableEdit, updatePostItem: this.updatePostItem, deletePostItem: this.deletePostItem,
    };
    return (
      // <Mutation
      //   mutation={UPDATE_POST_MUTATION}
      //   variables={{
      //     userId: postItem.userId,
      //     postId: postItem.id,
      //     title: postItem.title,
      //     content: postItem.content,
      //   }}
      //   refetchQueries={() => ['ALL_POSTS_QUERY']}
      // >
      //   {(
      //     updatePost, { loading: loadingUpdate, error: errorUpdate }
      //   ) => {
      <Composed>
      {({
        updatePostMutate, deletePostMutate,
      }) => {
        // console.log('PostBlock render updatePostMutate', updatePostMutate);
        // console.log('PostBlock render deletePostMutate', deletePostMutate);
        const { loading: loadingUpdate, error: errorUpdate } = updatePostMutate;
        const { loading: loadingDelete, error: errorDelete } = deletePostMutate;
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
              <input
                className='title-view'
                name="title"
                readOnly={readOnly}
                disabled={loadingUpdate}
                defaultValue={postItem.title}
                onChange={this.handleChange}
              />

              <div className="post-meta">
                <p>{postItem.userId}</p>
                <p>{postItem.createdDate}</p>
              </div>
              <Form>
                {/* <TextArea
                  className='post-content'
                  name="content"
                  readOnly={readOnly}
                  disabled={loadingUpdate}
                  //loading={loadingUpdate}
                  defaultValue={postItem.content}
                  onChange={this.handleChange}
                  placeholder='Текст поста' /> */}
                  <Form.Field
                    control={TextareaAutosize}
                    // useCacheForDOMMeasurements
                    className='post-content'
                    name="content"
                    readOnly={readOnly}
                    disabled={loadingUpdate}
                    // loading={loadingUpdate}
                    defaultValue={postItem.content}
                    onChange={this.handleChange}
                    placeholder='Текст поста'
                    // label="About"
                    // placeholder="Tell us more about you..."
                    // onChange={e => this.setState({ value: e.target.value })}
                    // useCacheForDOMMeasurements
                    // value={this.state.value}
                  />
              </Form>
              {
                authorIsCurrentUser
                && <UpdateBlock updateProps={updateProps}
                // showEdit={showEdit} enableEdit={this.enableEdit} updatePostItem={this.updatePostItem} updatePost={updatePost} loadingUpdate={loadingUpdate} deletePostItem={this.deletePostItem} deletePost={deletePost}
                />
              }
              {/* {showEdit === '' ? (
                <Button.Group basic attached='bottom'>
                <Button
                icon
                size="large"
                onClick={() => this.enableEdit('1')}
                ><Icon name="edit outline" /></Button>
                <Button
                icon size="large"
                ><Icon name="trash alternate outline" /></Button>
              </Button.Group>
              ) : (
                <Segment attached='bottom'>
                  <Button
                    onClick={() => this.updatePostItem(updatePost)}
                    >
                    Обнов{loadingUpdate ? 'ление' : 'ить'}
                  </Button>
                  <Button onClick={() => this.enableEdit('')}>Отмена</Button>
                </Segment>
              )}  */}
            </Segment>
            <CommentBlock postId={postItem.id} userId={user.id} />
            {/* <CommentDiv>
              <Header as='h3'>Комментарии {'12'}</Header>
              <Divider horizontal></Divider>
              <CommentCreateForm userId={user.Id}/>
              <Divider horizontal></Divider>
              <CommentList postId={postItem.Id}/>
            </CommentDiv> */}
          </RowDiv>
        );
      }}
      </Composed>
      // </Mutation>
    );
  }
}

export default withUserContext(PostBlock);
