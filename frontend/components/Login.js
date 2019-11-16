import React, { Component } from 'react';
import {
  Mutation, Query, ApolloConsumer, graphql,
} from 'react-apollo';
import gql from 'graphql-tag';
import { adopt } from 'react-adopt';
// import CartStyles from './styles/CartStyles';
// import CloseButton from './styles/CloseButton';
import Link from 'next/link';
import Router from 'next/router';
import { Button, Loader, Icon } from 'semantic-ui-react';
// import NProgress from 'nprogress';
import styled from 'styled-components';
import Form from './styles/Form';
// import Spinner from './styles/Spinner';
import ErrorMessage from './ErrorMessage';
import User, { CURRENT_USER_QUERY } from './User';

const SIGNIN_MUTATION = gql`
  mutation SIGNIN_MUTATION($email: String!, $password: String!) {
    signIn(email: $email, password: $password) {
      id
      email
      name
    }
  }
`;

const CURRENT_USER_MUTATION = gql`
  mutation CURRENT_USER_MUTATION($id: String!, $name: String!, $email: String!){
    currentUser(id: $id, name: $name, email: $email) @client
  }
`;

// const Login = graphql(gql`
//     mutation SIGNIN_MUTATION($email: String!, $password: String!) {
//   signIn(email: $email, password: $password) {
//     id
//     email
//     name
//   }
// }`,
// {
//   options: {
//     refetchQueries: () => [ 'CURRENT_USER_QUERY' ]
//   },
// })(LoginComponent);


const SIGNUP_MUTATION = gql`
  mutation SIGNUP_MUTATION($name: String!, $email: String!, $password: String!) {
    signUp(name: $name, email: $email, password: $password) {
      id
      email
      name
    }
  }
`;


// const SignupPromt = styled.div`
//   /* text-align: center;
//   font-size: 1rem;
//   margin: 1rem 0;
//   p {
//     margin: 0;
//   }
//   a {
//     background: lightgrey;
//     text-transform: uppercase;
//     font-weight: 800;
//     font-size: 1em;
//     cursor: pointer;
//     color: ${props => props.theme.black};
//   } */
// `;

const RowDiv = styled.div`
position: fixed;
display: block;
overflow: hidden;
    margin-left: 70%;
    margin-top: 45px;
    background: white;
    padding: 20px;
    width: 300px;
    height: 100vh;
    z-index: 100;
    /* color: #fff;
    text-align: center;
    text-shadow: 0 0 5px rgba(0,0,0,.5); */
    /* .login-background {
    transition: .6s filter;
    }
    .login-background.de-emphasized {
    filter: blur(5px);
    } */
    /* .blur {
    z-index: 99;
    background-image: url(image.png);
    background-size: cover;
    background-repeat: no-repeat; */
}
`;

const FormDiv = styled.div`
  /* max-width: 300px; */
  box-sizing: border-box;
  margin: 50px 0;
  padding: 0;
  color: rgba(0, 0, 0, 0.65);
  font-size: 14px;
  font-variant: tabular-nums;
  line-height: 1.5;
  list-style: none;
  font-feature-settings: 'tnum';
  form {
    max-height: 350px;
    box-shadow: 0 0 5px 3px rgba(0, 0, 0, 0.05);
    background: rgba(0, 0, 0, 0.02);
    border: 5px solid white;
    /* padding: 5px; */
    font-size: 1.5rem;
    line-height: 1.5;
    font-weight: 600;
    fieldset::before {
      height: 1px;
      margin-bottom: 25px;
      margin-top: 10px;
    }
  }
  .formItem {
    position: relative;
    height: auto;
    display: block;
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    color: rgba(0, 0, 0, 0.65);
    font-size: 14px;
    font-variant: tabular-nums;
    line-height: 1.5;
    list-style: none;
    font-feature-settings: 'tnum';
    margin-bottom: 24px;
    .formItem-control {
      position: relative;
      line-height: 40px;
      .input-wrapper {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
        color: rgba(0, 0, 0, 0.65);
        font-size: 14px;
        font-variant: tabular-nums;
        line-height: 1.5;
        list-style: none;
        font-feature-settings: 'tnum';
        position: relative;
        display: inline-block;
        width: 100%;
        text-align: start;
        input:not(:first-child) {
          padding-left: 30px;
        }
        input {
          position: relative;
          min-height: 100%;
        }
        .input-prefix {
          position: absolute;
          margin-left: 10px;
          top: 50%;
          z-index: 2;
          display: flex;
          -webkit-box-align: center;
          align-items: center;
          color: rgba(0, 0, 0, 0.65);
          line-height: normal;
          transform: translateY(-50%);
        }
      }
      input {
        box-sizing: border-box;
        margin: 0;
        font-variant: tabular-nums;
        list-style: none;
        font-feature-settings: 'tnum';
        display: inline-block;
        width: 100%;
        height: 32px;
        padding: 4px 11px;
        color: rgba(0, 0, 0, 0.65);
        font-size: 14px;
        line-height: 1.5;
        background-color: #fff;
        background-image: none;
        border: 1px solid #d9d9d9;
        border-radius: 4px;
        transition: all 0.3s;
      }
    }
  }
  .form-item-children {
    position: relative;
  }
  label {
    font-size: 14px;
  }
  .checkbox-wrapper {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    color: rgba(0, 0, 0, 0.65);
    font-variant: tabular-nums;
    list-style: none;
    font-feature-settings: 'tnum';
    display: inline-block;
    line-height: unset;
    cursor: pointer;
  }
  span.checkbox {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    color: rgba(0, 0, 0, 0.65);
    font-size: 13px;
    font-variant: tabular-nums;
    list-style: none;
    font-feature-settings: 'tnum';
    position: relative;
    top: -0.09em;
    display: inline-block;
    line-height: 1;
    white-space: nowrap;
    vertical-align: middle;
    outline: none;
    cursor: pointer;
    + span {
      padding-right: 8px;
      padding-left: 8px;
    }
  }
  input[type='checkbox'] {
    line-height: normal;
    width: 14px;
    height: 14px;
    box-sizing: border-box;
    padding: 0;
  }
  .checkbox-inner {
    position: relative;
    top: 0;
    left: 0;
    display: block;
    width: 16px;
    height: 16px;
    border: 1px solid #d9d9d9;
    border-radius: 2px;
    border-collapse: separate;
    transition: all 0.3s;
  }
  .login-form-forgot {
    float: right;
    font-size: 13px;
  }
  a {
    color: rgba(0, 0, 0, 0.65);
    font-size: 13px;
    text-decoration: none;
    background-color: transparent;
    outline: none;
    cursor: pointer;
    transition: color 0.3s;
    font-style: normal;
    font-weight: 400;
    &:hover {
      color: #1ab394;
      font-weight: 600;
    }
  }
  .login-form-button {
    width: 100%;
  }
`;

/* eslint-disable */
const Composed = adopt({
  currentUser: ({render}) => <Query query={CURRENT_USER_QUERY}>{render}</Query>,
  signupMutate: ({render}) => <Mutation mutation={SIGNUP_MUTATION}>{render}</Mutation>,
  signinMutate: ({render}) => <Mutation mutation={SIGNIN_MUTATION}>{render}</Mutation>,
  currentUserMutate: ({render}) => <Mutation mutation={CURRENT_USER_MUTATION}>{render}</Mutation>,

});
/* eslint-enable */


class Login extends Component {
  state = {
    // id: '',
    name: '',
    email: '',
    password: '',
    loading: false,
    signup: false,
    error: '',
  };

  showSignUp = () => {
    console.log('Login showSignUp');
    this.setState({
      // id: '',
      name: '',
      email: '',
      password: '',
      signup: true,
      error: '',
    });
  };

  // updateCurrentUser = (cache, payload) => {
  //   // manually update the cache on the client
  //   // 1. Read the cache for the items we want
  //   const data = cache.readQuery({ query: CURRENT_USER_QUERY });
  //   console.log('updateCurrentUser cache: ', cache);
  //   console.log('updateCurrentUser payload:', payload);
  //   // 2. Filter the deleted item out of the page
  //   // const deleteItemId = payload.data.deleteItem.id;
  //   const { me } = payload.data;
  //   data.me = { ...me };
  //   // 3. Put the items back!
  //   cache.writeQuery({ query: CURRENT_USER_QUERY, data });
  // };

  createAccount = async (e, signupMutate) => {
    e.preventDefault();
    console.log('Login SignUp this.state: ', this.state);
    const { name, email, password } = this.state;
    const res = await signupMutate({
      variables: { name, email, password },
      refetchQueries: [{
        query: CURRENT_USER_QUERY,
      }],
    });
    console.log('createAccount res', res);

    this.setState({
      // id: '',
      name: '',
      email: '',
      password: '',
      signup: false,
      error: '',
    },
    () => {
      console.log('Login createAccount this.state: ', this.state);

      this.props.handleRes(res);
    });
  };

  // readQuery({
  //   query: gql`
  //     query {
  //     me {
  //       id
  //       email
  //       name
  //     }
  //   }
  //   `,
  // })

  /* disable eslint(no-underscore-dangle) */
  signInHandle = async (e, signinMutate, currentUserMutate) => {
    e.preventDefault();
    console.log('Login signInHandle this.state: ', this.state);
    // console.log('Login signInHandle client: ', client);
    const { email, password } = this.state;
    // const login = {email: this.state.email, password: this.state.password,};
    // const res = await signinMutate({
    //   variables: { email, password },
    //   // update: (proxy, { data: { User } }) => {
    //   //   const data = proxy.readQuery({ query: CURRENT_USER_QUERY });
    //   //   data.currentUser = { ...User};
    //   //   proxy.writeQuery({ query: CURRENT_USER_QUERY, data });
    //   // },
    //   refetchQueries: [{
    //     query: CURRENT_USER_QUERY,
    //   }],
    // }).catch((error) => {
    //   // console.log('signInHandle Error: ', error.message);
    //   const errMessage = error.message.replace('GraphQL error: ', '');
    //   this.setState({
    //     name: '',
    //     email: '',
    //     password: '',
    //     signup: false,
    //     error: errMessage,
    //   });
    // });

    const res = await signinMutate({
      variables: { email, password },
      // update: {(cache, { data: { me } }) => {
      //   const {me} = cache.readQuery({ query: CURRENT_USER_QUERY });
      //   console.log('signinMutate update me: ', me);
      //   cache.writeQuery({
      //     query: CURRENT_USER_QUERY,
      //     data: { me: me },
      //   });
      // }},
      update: this.update,
      refetchQueries: [{
        query: CURRENT_USER_QUERY,
      }],
    }).catch((error) => {
      // console.log('signInHandle Error: ', error.message);
      const errMessage = error.message.replace('GraphQL error: ', '');
      this.setState({
        name: '',
        email: '',
        password: '',
        signup: false,
        error: errMessage,
      });
    });


    if (res) {
      console.log('signInHandle res', res);

      this.setState({
        name: '',
        email: '',
        password: '',
        signup: false,
        error: '',
      },
      async () => {
        console.log('Signin signInHandle this.state: ', this.state);
        this.props.setCurrentUser(res.data.signIn);
        this.props.handleRes(res);
        const currentUser = res.data.signIn;
        // currentUser.__typename = 'currentUser';
        console.log('Signin currentUserMutate currentUser: ', currentUser);
        await currentUserMutate({
          variables: { id: currentUser.id, name: currentUser.name, email: currentUser.email },
        }).catch((error) => {
          console.log('Signin currentUserMutate Error: ', error.message);
        });
        // console.log('Signin currentUserMutate resCache: ', resCache);
      });
    }
  };
  /* enable eslint(no-underscore-dangle) */

  update = (cache, { data: { me } }) => {
    const data = cache.readQuery({ query: CURRENT_USER_QUERY });
    console.log('signinMutate update data: ', data);
    console.log('signinMutate update me: ', me);
    // data.currentUser = { ...me };
    // cache.writeQuery({
    //   query: CURRENT_USER_QUERY,
    //   data,
    // });
  };


  saveToState = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    console.log('Login this.props: ', this.props);
    // console.log('Signin this.state: ', this.state);
    const { signup, error } = this.state;

    return (
          <Composed>
          {({
            currentUser, signinMutate, signupMutate, currentUserMutate,
          }) => {
            const { loading: loadingsignin, update } = signinMutate;
            // console.log('Login errorsignin: ', errorsignin);
            return (
          <RowDiv className="login-background">
          <div className="blur">
            <FormDiv>
              <Form
                // method="post"
                // onSubmit={async e => {
                //   console.log('Signin onSubmit-> e ', e);
                //   e.preventDefault();
                //   // if (loading) {
                //   //   this.setState({ loading });
                //   // }
                //   console.log('Signin this.state: ', this.state);
                //   const res = await signIn();
                //   console.log('signIn -> render -> res', res);
                //   console.log('Signin this.props: ', this.props);
                //   this.props.handleRes(res);
                //   this.setState({ email: '', name: '', password: '' }, () => {
                //     // console.log('TCL: signin -> setState clear');
                //     // Router.push({
                //     //   pathname: '/',
                //     // });
                //   });
                // }}
              >
                {error && <ErrorMessage error={error} />}
                <fieldset disabled={loadingsignin} aria-busy={loadingsignin}>
                  {/* <Error error={error} /> */}
                  {signup
                    && <div className="formItem">
                    <label htmlFor="name">
                      <div className="formItem-control">
                        <span className="input-wrapper">
                          <span className="input-prefix">
                            <Icon name="user outline" />
                          </span>
                          <input
                            type="text"
                            name="name"
                            placeholder="имя"
                            value={this.state.name}
                            onChange={this.saveToState}
                          />
                        </span>
                      </div>
                    </label>
                  </div>
                  }
                  <div className="formItem">
                    <label htmlFor="email">
                      <div className="formItem-control">
                        <span className="input-wrapper">
                          <span className="input-prefix">
                            <Icon name="mail" />
                          </span>
                          <input
                            type="text"
                            name="email"
                            placeholder="email"
                            value={this.state.email}
                            onChange={this.saveToState}
                          />
                        </span>
                      </div>
                    </label>
                  </div>
                  <div className="formItem">
                    <label htmlFor="password">
                      <div className="formItem-control">
                        <span className="input-wrapper">
                          <span className="input-prefix">
                            <Icon name="lock" />
                          </span>
                          <input
                            type="password"
                            name="password"
                            placeholder="пароль"
                            value={this.state.password}
                            onChange={this.saveToState}
                          />
                        </span>
                      </div>
                    </label>
                  </div>
                  <div className="formItem">
                    <div className="formItem-control">
                      <span className="form-item-children">

                        {
                          signup
                          // <ApolloConsumer>
                          // {client => (
                            ? <Button compact fluid
                                onClick={(e) => this.createAccount(e, signupMutate, currentUser)}
                                positive
                                >
                                <span>Создать аккаунт</span>
                              </Button>
                          // )}
                          // </ApolloConsumer>
                            :
                         // <ApolloConsumer>
                         //   {client => (
                         <Button.Group compact fluid>
                            <Button
                            onClick={(e) => this.signInHandle(e, signinMutate, currentUserMutate)}
                            // type="submit"
                            positive
                            >
                            <span>Войти</span>
                            </Button>
                            <Button.Or text=' ' />
                              <Button
                            onClick={() => this.showSignUp()}
                            >
                            <span>Зарегистрироваться</span>
                            </Button>
                          </Button.Group>
                          // )}
                          // </ApolloConsumer>
                        }
                      </span>
                    </div>
                  </div>
                </fieldset>

              </Form>
            </FormDiv>
            </div>
          </RowDiv>
            );
          }}
  </Composed>
    );
  }
}

export default Login;
// export { LOCAL_STATE_QUERY, TOGGLE_CART_MUTATION };
