import React, { Component } from 'react';
import { Mutation, Query, ApolloConsumer } from 'react-apollo';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import {
  Radio,
  Header,
  Segment,
  Button,
  Checkbox,
  Icon,
  Table,
  Form,
} from 'semantic-ui-react';
import styled from 'styled-components';
//import NProgress from 'nprogress';
import CreateFormCategoryTP from './CreateFormCategoryTP';
import Item from './PostCard';
// import Error from './ErrorMessage';

const RowDiv = styled.div`
  margin: 52px 0px;
  padding: 30px 10px;
  border: 1px solid rgba(34, 36, 38, 0.15);
  border-radius: 0.28571429rem;
  box-shadow: 0 1px 2px 0 rgba(34, 36, 38, 0.15);
  .menu-account-info {
    font-family: 'Montserrat Alternates', 'Roboto', 'Open Sans', sans-serif,
      'Arial';
  }
  .segment.segment-bottom {
    display: flex;
    justify-content: space-between;
  }
`;

const FormTab = styled.div`
  form {
    > div.inline.fields.radio-buttons {
      /* margin: 0 0 1em; */
      border: 1px solid rgba(34, 36, 38, 0.15);
      padding: 1em 1em;
    }
    /* div.radio-buttons {
      padding: 10px 0;
    } */
    div.fields.form-group-submit {
      /* display: none; */
      display: ${props => props.submitShow};
    }
    div.fields.form-group-edit {
      /* display: flex; */
      display: ${props => props.editShow};
    }
  }
`;

// const perScreen = 5;

const ALL_POSTS_QUERY = gql`
  query ALL_POSTS_QUERY {
    posts {
      id
      title
      userId
      content
      createdDate
    }
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
      content: $content)
      {
        id
        title
        userId
        content
        createdDate
    }
  }
`;

const PostList = props => (
  <Query query={ALL_POSTS_QUERY}>
    {({ data: { posts }, loading: loadingQuery }) => {
      console.log('query PostList posts: ', posts);
      if (loadingQuery)
        return (
          <div>
            <p>Загрузка...</p>
            <Icon loading name="spinner" />
          </div>
        );
      if (!posts) {
        return <p>Постов нет</p>;
      }
      // console.log('const PostList: props:', props);
      return (
        <RowDiv>
          <div>
            <Segment.Group>
              <Segment>
              <ItemsList>
                {data.posts.map(post => (
                  <PostBlock postItem={postItem} key={post.id} />
                ))}
              </ItemsList>
                <CreateFormCategoryTP />
              </Segment>
            </Segment.Group>
          </div>
        </RowDiv>
      );
    }}
  </Query>
);

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
      userId: postItem.userId,
      postId: postItem.postId,
      title: postItem.title,
      content: postItem.content,
      },
      // refetchQueries: [{ query: ALL_POSTS_QUERY, variables: {} }],
    })
    console.log('updatePostItem UPDATED!!!! res: ', res);
    this.setState({
      postItem: this.props.postItem,
      // postItem: {
      //   userId:
      //   title: '',
      //   content: '',
      //   createdDate: '',
      // },
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
        variables={
          postItem
          // {postItem: this.state.postItem,categoryTaxPayerId: this.props.postItem.id,}
        }
        refetchQueries={() => ['ALL_POSTS_QUERY']}
      >
        {({
          updatePost, loading: loadingUpdate, error: errorUpdate }
        ) => (
          <Table.Row>
            <Table.Cell>
              <Form.Input
                fluid
                name="title"
                readOnly={readOnly}
                disabled={loadingUpdate}
                loading={loadingUpdate}
                defaultValue={postItem.title}
                onChange={this.handleChange}
                // width={required
              />
            </Table.Cell>
            <Table.Cell>
              <Form.Input
                fluid
                name="userId"
                readOnly={readOnly}
                disabled={loadingUpdate}
                loading={loadingUpdate}
                // defaultValue={postItem.userId}
                // value={readOnly ? postItem.userId : categoryTP.userId}
                defaultValue={postItem.userId}
                onChange={this.handleChange}
                // width={8}
                required
              />
            </Table.Cell>
            <Table.Cell>
              <Form.Input

                fluid
                name="createdDate"
                readOnly={readOnly}
                disabled={loadingUpdate}
                loading={loadingUpdate}
                // value={
                //   readOnly ? postItem.createdDate : categoryTP.createdDate
                // }
                defaultValue={postItem.createdDate}
                onChange={this.handleChange}
                // width={8}
                required
              />
            </Table.Cell>
            <Table.Cell>
              <Form.Input

                fluid
                name="content"
                readOnly={readOnly}
                disabled={loadingUpdate}
                loading={loadingUpdate}
                // value={readOnly ? postItem.content : categoryTP.content}
                defaultValue={postItem.content}
                onChange={this.handleChange}
                // width={8}
                required
              />
            </Table.Cell>
            <Table.Cell>
              <Checkbox

                toggle
                name="isActive"
                readOnly={readOnly}
                disabled={loadingUpdate}
                // checked={readOnly ? postItem.isActive : categoryTP.isActive}
                checked={postItem.isActive}
                onChange={this.handleChange}
                // required
              />
            </Table.Cell>

            {showEdit === '' ? (
              <Table.Cell collapsing colSpan="2">
                <Button
                  // TODO tooltip
                  icon
                  size="large"
                  onClick={() => this.enableEdit('1')}
                >
                  <Icon name="edit outline" />
                </Button>
                <Button icon size="large">
                  <Icon name="trash alternate outline" />
                </Button>
              </Table.Cell>
            ) : (
              <Table.Cell collapsing colSpan="2">
                <Button
                  onClick={() => this.updatePostItem(updatePost)}

                  Обнов{loadingUpdate ? 'ление' : 'ить'}
                </Button>
                <Button onClick={() => this.enableEdit('')}>Отмена</Button>
              </Table.Cell>
            )}
          </Table.Row>
        )}
      </Mutation
    );
  }
}

export default Post