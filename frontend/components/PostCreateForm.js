import React, { Component } from 'react';
import { Mutation, Query, ApolloConsumer } from 'react-apollo';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {
  Grid, Segment, Form, Icon, TextArea, Button, Header, Message,
} from 'semantic-ui-react';
import Router from 'next/router';
import { ALL_POSTS_QUERY } from './PostList';
import User, { CURRENT_USER_QUERY } from './User';
// import ProfileSidebar from "./ProfileSidebar";
// import { Message, Segment, , Icon, Form, , Label} from 'semantic-ui-react';


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

  // enableEdit = val => {
  //   console.log('PostCreateForm enableEdit');
  //   if (val === '1') {
  //     this.setState({
  //       showEdit: '1',
  //       readOnly: false,
  //     });
  //   } else {
  //     this.setState({
  //       showEdit: '',
  //       readOnly: true,
  //       postItem: this.props.postItem,
  //     });
  //   }
  // };

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

  // createPostItem = async (e, client, createPost) => {
    createPostItem = async (e, createPost) => {
      e.preventDefault();
      // const { me } = client.readQuery({ query: CURRENT_USER_QUERY });
      // console.log('createPostItem e: ', e);
      // console.log('createPostItem readQuery me.id: ', me.id);
      // console.log('createPostItem createPost this.state: ', this.state);
      const { userId, title, content } = this.state.postItem;
      console.log(
        'PostCreateForm createPost this.state.postItem: ',
        this.state.postItem,
      );
      const res = await createPost({
        variables: {
        // userId: me.id, title, content
          userId, title, content,
        },
        refetchQueries: [{
          query: ALL_POSTS_QUERY,
        }],
      });
      // TO-DO update feed after adding new post
      console.log('PostCreateForm CREATED!!!! res: ', res.data.createPost);
      const { id } = res.data.createPost;
      this.setState({
      // postItem: this.props.postItem,
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
        // this.props.updateBlog(res);
        Router.push({
          pathname: '/post',
          query: { id },
        });
      });
    };

    render() {
      console.log('PostCreateForm render -> props', this.props);
      console.log('PostCreateForm render -> state', this.state);
      const {
        postItem, // : { userId, postId, title, content },
        // showCreate,
        readOnly,
        showEdit,
      } = this.state;
      // const { client } = this.props;
      console.log('PostCreateForm render -> state.postItem', postItem);
      return (

      <Mutation
        mutation={CREATE_POST_MUTATION}
        variables={{
          postItem,
        }}
        refetchQueries={() => ['ALL_POSTS_QUERY']}
      >
        {(createPost, { loading, error }) => {
          if (error) {
            return (
            <Message negative>
              <Message.Header>Ошибка!</Message.Header>
              <p>{error.message.replace('GraphQL error: ', '')}</p>
            </Message>);
          }
          return (
            <>

            <Segment padded>
                <Form
                  onSubmit={(e) => this.createPostItem(e, createPost)
                  }
                  loading={loading}
                  // error={<Error error={error} />}
                  error
                >

                  {/* <Form.Group> */}
                      <Form.Input
                        // className='title-view'
                        // widths='equal'
                        fluid
                        name="title"
                        readOnly={readOnly}
                        disabled={loading}
                        placeholder="Заголовок поста"
                        defaultValue={postItem.title}
                        onChange={this.handleChange}
                        required
                      />
                    {/* </Form.Group> */}
                  {/* <Form.Input
                    as='div'
                    fluid
                    name="title"
                    readOnly={readOnly}
                    disabled={loading}
                    loading={loading}
                    defaultValue={postItem.title}
                    onChange={this.handleChange}
                    // width={required
                  />
                  <div>
                  <input
                  className='title-view'
                    name="title"
                    readOnly={readOnly}
                    disabled={loading}
                    placeholder="Заголовок поста"
                    defaultValue={postItem.title}
                    onChange={this.handleChange}
                  />
                  </div> */}

                  {/* <div className="post-meta">
                     <p>{postItem.userId}</p> */}
                    {/* <p>{postItem.createdDate}</p>
                  </div> */}
                  {/* <Form.Input
                    fluid
                    name="content"
                    readOnly={readOnly}
                    disabled={loading}
                    loading={loading}
                    defaultValue={postItem.content}
                    onChange={this.handleChange}
                    // width={8}
                    required
                  /> */}

                  <Form.TextArea
                      className='post-content'
                      name="content"
                      readOnly={readOnly}
                      disabled={loading}
                      // loading={loading}
                      placeholder="Текст поста"
                      defaultValue={postItem.content}
                      onChange={this.handleChange}
                    />

                  {/* <Form.Button
                    floated="right"
                    icon
                    labelPosition="left"
                    onClick={() => this.createPostItem(createPost)}
                  >
                    <Icon name="plus circle" /> Добавить пост
                  </Form.Button> */}
                  <Button
                  type="submit"
                  loading={loading}
                  fluid
                  icon
                  labelPosition="left"
                  // onClick={() => this.createPostItem(createPost)}
                  >
                    {/* <Icon name="plus circle" /> */}
                    Добавить пост
                  </Button>
                </Form>
              </Segment>
            </>
          );
        }}
      </Mutation>
      );
    }
}

export default PostCreateForm;
