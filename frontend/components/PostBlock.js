import React, { Component } from 'react';
import { Mutation, Query, ApolloConsumer } from 'react-apollo';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import { Message, Segment, Button, Icon, Form, TextArea, Label
} from 'semantic-ui-react';
import styled from 'styled-components';
//import NProgress from 'nprogress';
//import CreateFormCategoryTP from './CreateFormCategoryTP';
import { ALL_POSTS_QUERY } from './PostList';
// import Error from './ErrorMessage';

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
    // showCreate: '',
    readOnly: true,
    showEdit: '',
  };

  enableEdit = val => {
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
    console.log(`handleChange: data: `, data);
    console.log(
      `handleChange: name: ${name}, type: ${type}, value: ${value}, data.checked: ${
        data.checked
      }, data.name: ${data.name}`
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

  updatePostItem = async updatePost => {
    // console.log('updatePostItem e: ', e);
    // console.log('PostList updatePostItem this.state: ', this.state);
    const { postItem } = this.state;
    console.log(
      'PostList updatePostItem this.state.postItem: ',
      postItem
    );
    const res = await updatePost({
      variables: {
        userId: postItem.userId,
        postId: postItem.id,
        title: postItem.title,
        content: postItem.content,
      },
      });
    console.log('updatePostItem UPDATED!!!! res: ', res);
    this.setState({
      postItem: this.props.postItem,
      showEdit: '',
      readOnly: true,
    });
  };

  render() {
    console.log('PostBlock render -> props', this.props);
    console.log('PostBlock render -> state', this.state);
    const {
      postItem,
      // showCreate,
      readOnly,
      showEdit,
    } = this.state;
    console.log('PostBlock render -> state.postItem', postItem);
    return (
      <Mutation
        mutation={UPDATE_POST_MUTATION}
        variables={{
          userId: postItem.userId,
          postId: postItem.id,
          title: postItem.title,
          content: postItem.content,
        }}
        refetchQueries={() => ['ALL_POSTS_QUERY']}
      >
        {(
          updatePost, { loading: loadingUpdate, error: errorUpdate }
        ) => {
            if (errorUpdate) {
            return (
              <Message negative>
                <Message.Header>Ошибка!</Message.Header>
                <p>{errorUpdate.message.replace('GraphQL error: ', '')}</p>
              </Message>);
            }
            return (
            <>
              <Segment>
                {/* <Label attached='top right'>
                <Icon name='trash alternate outline' size='big' /></Label> */}

                {/* <Form.Input
                  as='div'
                  fluid
                  name="title"
                  readOnly={readOnly}
                  disabled={loadingUpdate}
                  loading={loadingUpdate}
                  defaultValue={postItem.title}
                  onChange={this.handleChange}
                  // width={required
                /> */}
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
                {/* <Form.Input
                  fluid
                  name="content"
                  readOnly={readOnly}
                  disabled={loadingUpdate}
                  loading={loadingUpdate}
                  defaultValue={postItem.content}
                  onChange={this.handleChange}
                  // width={8}
                  required
                /> */}
                <Form>
                  <TextArea
                  className='post-content'
                              name="content"
                              readOnly={readOnly}
                              disabled={loadingUpdate}
                              loading={loadingUpdate}
                              defaultValue={postItem.content}
                              onChange={this.handleChange}
                  placeholder='Текст поста' />
                </Form>

                {showEdit === '' ? (
                  //<Segment attached='bottom'>
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
                    /* <Button
                      // TODO tooltip
                      icon
                      size="large"
                      onClick={() => this.enableEdit('1')}
                    >
                      <Icon name="edit outline" />
                    </Button>
                    <Button icon size="large">
                      <Icon name="trash alternate outline" />
                    </Button> */
                  //</Segment>
                ) : (
                  <Segment attached='bottom'>
                    <Button
                      onClick={() => this.updatePostItem(updatePost)}
                      >
                      Обнов{loadingUpdate ? 'ление' : 'ить'}
                    </Button>
                    <Button onClick={() => this.enableEdit('')}>Отмена</Button>
                  </Segment>
                )}
              </Segment>
            </>
          );
        }}
      </Mutation>
    );
  }
}

export default PostBlock;