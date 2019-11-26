import React, { Component } from 'react';
import { Mutation, Query } from 'react-apollo';
//import { withApollo } from '@apollo/react-hoc';
import { graphql } from '@apollo/react-hoc';
//import { adopt } from 'react-adopt';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import {
  Message, Segment, Button, Icon, Form, Item, Label, Header, Divider, Card, Image, 
} from 'semantic-ui-react';
// import TextareaAutosize from 'react-textarea-autosize';
import Router from 'next/router';
import styled from 'styled-components';
import moment from 'moment';
// import withUserContext from '../lib/withUserContext';
// import { SIGN_OUT_MUTATION } from './SignOut';
import { CURRENT_USER_QUERY } from './User';


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

// const UPDATE_PASSWORD_MUTATION = gql`
//   mutation UPDATE_PASSWORD_MUTATION(
//     $userId: String!
//     $password: String!
//   ) {
//     updatePassword(
//       userId: $userId
//       password: $password
//       ) {
//     }
//   }
// `;

// const DELETE_USER_MUTATION = gql`
//   mutation DELETE_USER_MUTATION(
//     $userId: String!
//     $password: String!
//   ) {
//     deleteUser(
//       userId: $userId
//       password: $password
//       ) {
//         message
//     }
//   }
// `;


const withDeleteUserMutate = graphql(
  gql`
  mutation DELETE_USER_MUTATION(
    $userId: String!
    $password: String!
  ) {
    deleteUser(
      userId: $userId
      password: $password
      ) {
        message
      }
    }
  `,
  {
    options: props => ({
    refetchQueries: [
      {
        query: CURRENT_USER_QUERY,
        
      }
    ],
    onCompleted: (response) => {
      console.log('deleteUser onCompleted!!!! response: ', response);
      if(typeof response.deleteUser !== 'undefined' && response.deleteUser.message==='Success') {
            Router.push({
              pathname: '/',
            });
      }
    }
  }),
  },
  );


class DeleteBlock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        id: '', 
        name: '', 
        email: '',
        password: '',
      },
      readOnly: true,
      showDelete: false,
      successResponse: false
    }
  }

  enableDelete = (val) => {
    console.log('PostBlock enableDelete');
    const { user } = this.props;
    if (val) {
      this.setState({
        user: { ...user, password: '', },
        //user.password: '',
        // user: this.props.user,
        showDelete: true,
        readOnly: false,
      });
    } else {
      this.setState({
        showDelete: false,
        readOnly: true,
        user: this.props.user,
      });
    }
  };

  handleChange = (e, data) => {
    const { name, type, value } = e.target;
    // console.log('handleChange: data: ', data);
    console.log(`handleChange: name: ${name}, type: ${type}, value: ${value}`);

    const val = value;
    const nam = name;

    const { user } = this.state;
    user[nam] = val;
    this.setState({ user });
  };

  // updatePassword = async (updatePassword) => { };

  // deleteUserFn = async (deleteUser) => {
  //   // console.log('PostList deleteUserFn this.state: ', this.state);
  //   const { user } = this.state;
  //   const { client } = this.props;

  //   // const res = await deleteUser({
  //   //   variables: {
  //   //     userId: user.id,
  //   //     password: user.password,
  //   //   },
  //   //   refetchQueries: [
  //   //   //     // {
  //   //   //     //   query: CURRENT_USER_QUERY,
  //   //   //     // },
  //   //       {
  //   //         mutation: SIGN_OUT_MUTATION,
  //   //       },
  //   //     ]
  //   // });
  //   console.log('deleteUser DELETED!!!! res: ', res);

  //   this.setState({
  //     user: '',
  //     showDelete: '',
  //     readOnly: true,
  //   },
  //   () => {
  //     console.log('DeleteBlock render -> state.user: ', user);
  //     Router.push({
  //       pathname: '/',
  //     });
  //   });
  // };

  render() {
    console.log('DeleteBlock render -> props', this.props);
    // console.log('Profile render -> state', this.state);
    // const user = this.props.user ? this.props.user : {
    //   id: '',
    //   name: '',
    //   email: '',
    // };
    const {mutate, result}=this.props;
    const {
      user,
      successResponse,
      readOnly,
      showDelete,
    } = this.state;

    // console.log('DeleteBlock render -> state.user: ', user);
    // console.log('DeleteBlock render -> this.props.user: ', this.props.user);
    // console.log('DeleteBlock render -> this.props.result: ', this.props.result);
    return (
      /*<Mutation
        mutation={DELETE_USER_MUTATION}
        variables={{
          userId: user.id,
          password: user.password,
        }}
      >*/
      // {(deleteUser, { loading, error }) => {
      //   if (error) {
      //     return (
      //     <Message negative>
      //       <Message.Header>Ошибка!</Message.Header>
      //       <p>{error.message.replace('GraphQL error: ', '')}</p>
      //     </Message>);
      //   }
        // return (
          <RowDiv>
            <Segment>

                {!showDelete ? (
                  <Button.Group basic attached='bottom'>
                    <Button
                      icon
                      size="large"
                      onClick={() => this.enableDelete(true)}
                    >
                      {/* <Icon name="edit outline" /> */}
                      Удалить аккаунт
                    </Button>
                  </Button.Group>
                ) : (
                  <Segment attached='bottom'>
                    
                    <Form.Input
                      label='Введите пароль' 
                      fluid
                      type="password"
                      name="password"
                      placeholder="пароль"
                      readOnly={readOnly}
                      disabled={result.loading}
                      value={user.password}
                      onChange={this.handleChange}
                      required
                    />
                    
                    <Divider horizontal></Divider>
                    
                      <Button
                        icon size="large"
                        // onClick={() => this.deleteUserFn(deleteUser)}
                        onClick={() => {mutate({
                                          variables: {
                                            userId: user.id,
                                            password: user.password,
                                          },
                                        });
                                        }
                                }
                      >
                        {/*<Icon name="trash alternate outline" />*/}
                        Удалить аккаунт
                      </Button>
                      <Button onClick={() => this.enableDelete(false)}>Отмена</Button>
                  

                  </Segment>
                )}
                {successResponse && 
                  <Message positive>
                    <Message.Header>Успешно!</Message.Header>
                    <p>Аккаунт {user.name} удален</p>
                  </Message>
                }

            </Segment>
          </RowDiv>
      //   );
      // }}
      // </Mutation>
    );
  }
}

export default withDeleteUserMutate(DeleteBlock);
