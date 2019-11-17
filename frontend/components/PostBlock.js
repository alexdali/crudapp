import React, { Component } from 'react';
import { Mutation, Query, ApolloConsumer } from 'react-apollo';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import { Message, Segment, Button, Icon, Form, TextArea, Label
} from 'semantic-ui-react';
import styled from 'styled-components';
//import NProgress from 'nprogress';
import withUserContext from '../lib/withUserContext';
//import CreateFormCategoryTP from './CreateFormCategoryTP';
import { ALL_POSTS_QUERY } from './PostList';
import User,{ CURRENT_USER_QUERY } from './User';
// import Error from './ErrorMessage';

const RowDiv = styled.div`
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

const UpdateBlock =({showEdit, enableEdit, updatePostItem, updatePost})=> {showEdit === '' ? (
  //<Segment attached='bottom'>
  <Button.Group basic attached='bottom'>
    <Button
      icon
      size="large"
      onClick={() => enableEdit('1')}
    ><Icon name="edit outline" /></Button>
    <Button
      icon size="large"
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
  };


  componentDidMount() {
    //let {user} = this.context;
    const { postItem, user } = this.props;
    if(postItem.userId===user.id)
    this.setState({
      authorIsCurrentUser: true,
      });
  }

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
    const user = this.props.user ? this.props.user : {
      id: '',
      name: '',
      email: ''};
    const {
      postItem,
      authorIsCurrentUser,
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
              <ApolloConsumer>
                {client => (
                  <RowDiv>
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
                                    //loading={loadingUpdate}
                                    defaultValue={postItem.content}
                                    onChange={this.handleChange}
                        placeholder='Текст поста' />
                      </Form>
                      {authorIsCurrentUser &&
                      <UpdateBlock showEdit={showEdit} enableEdit={this.enableEdit} updatePostItem={this.updatePostItem} updatePost={updatePost} />
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
                  </RowDiv>
                )}
              </ApolloConsumer>
          );
        }}
      </Mutation>
    );
  }
}

export default withUserContext(PostBlock);