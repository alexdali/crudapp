import React, { Component } from 'react';
import { Mutation, Query, ApolloConsumer } from 'react-apollo';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import { Message, Segment, Button, Icon, Form,
} from 'semantic-ui-react';
import styled from 'styled-components';
//import NProgress from 'nprogress';
//import CreateFormCategoryTP from './CreateFormCategoryTP';
import { ALL_POSTS_QUERY } from './PostList';
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

const POST_QUERY = gql`
  query POST_QUERY(
    $id: String!
  ) {
    post(id: $id) {
      id
      title
      userId
      content
      createdDate
    }
  }
`;

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

const ItemsList = styled.div`
  /* display: grid; */
  display: block;
  /* grid-template-columns: 1fr 1fr;
  grid-gap: 60px; */
  max-width: ${props => props.theme.maxWidth};
  margin: 2.5rem 3rem;
  padding: 0 4em;
  @media (max-width: 700px) {
    margin: 2.5rem 1rem;
  }
`;

// const Post = props => (
//   <Query query={ALL_POSTS_QUERY}>
//     {({ data: { posts }, loading: loadingQuery }) => {
//       console.log('query PostList posts: ', posts);
//       if (loadingQuery)
//         return (
//           <div>
//             <p>Загрузка...</p>
//             <Icon loading name="spinner" />
//           </div>
//         );
//       if (!posts) {
//         return <p>Постов нет</p>;
//       }
//       // console.log('const PostList: props:', props);
//       return (
//         <RowDiv>
//           <div>
//             <Segment.Group>
//               <Segment>
//               <ItemsList>
//                 {data.posts.map(post => (
//                   <PostBlock postItem={postItem} key={post.id} />
//                 ))}
//               </ItemsList>
//                 <CreateFormCategoryTP />
//               </Segment>
//             </Segment.Group>
//           </div>
//         </RowDiv>
//       );
//     }}
//   </Query>
// );

const Post = props => {
  console.log('const Post props: ', props);
  return (
  <Query query={POST_QUERY}
    variables={{
          id: props.id,
        }}
  >
    {({ data, loading: loadingQuery }) => {
      console.log('query Post data: ', data);
      return (
      loadingQuery ? (
          <div>
            <p>
            Загрузка...
            <i className="spinner icon"></i>
            {/* <Icon loading name="spinner" /> */}
            </p>
          </div>
        )
        :
        (
          <RowDiv>
          <div>
            <Segment.Group>
              <Segment>

                  <PostBlock postItem={data.post} key={data.post.id} />

                {/* <CreateFormCategoryTP /> */}
              </Segment>
            </Segment.Group>
          </div>
        </RowDiv>
        )
      );
    }}
  </Query>
  )};

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
            if (errorUpdate) {            //console.log('query Post errorUpdate: ', errorUpdate);
            //console.log('query Post errorUpdate: ', errorUpdate.message.replace('GraphQL error: ', ''));
            return (
              <Message negative>                <Message.Header>Ошибка!</Message.Header>
              <p>{errorUpdate.message.replace('GraphQL error: ', '')}           </p>
              </Message>);
            }
            return (
            <Segment>
            <div>
            <h2>
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
              </h2>
            <p>{postItem.userId}</p>
              {/* <Form.Input
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
              /> */}
              <p>{postItem.createdDate}</p>
              {/* <Form.Input
                fluid
                name="createdDate"
                readOnly={readOnly}
                disabled={loadingUpdate}
                loading={loadingUpdate}
                defaultValue={postItem.createdDate}
                onChange={this.handleChange}
                // width={8}
                required
              /> */}
            </div>
            <div>
              <Form.Input
                fluid
                name="content"
                readOnly={readOnly}
                disabled={loadingUpdate}
                loading={loadingUpdate}
                defaultValue={postItem.content}
                onChange={this.handleChange}
                // width={8}
                required
              />
            </div>

            {showEdit === '' ? (
              <Segment>
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
              </Segment>
            ) : (
              <Segment>
                <Button
                  onClick={() => this.updatePostItem(updatePost)}
                  >
                  Обнов{loadingUpdate ? 'ление' : 'ить'}
                </Button>
                <Button onClick={() => this.enableEdit('')}>Отмена</Button>
              </Segment>
            )}
          </Segment>
            );
        }}
      </Mutation>
    );
  }
}

export default Post;