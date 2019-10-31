import React, { Component } from 'react';
import { Mutation, Query } from 'react-apollo';
import gql from 'graphql-tag';
//import { adopt } from 'react-adopt';
//import CartStyles from './styles/CartStyles';
//import CloseButton from './styles/CloseButton';
import Link from 'next/link';
import Router from 'next/router';
import { Button, Loader, Icon } from 'semantic-ui-react';
//import NProgress from 'nprogress';
import styled from 'styled-components';
import Form from './styles/Form';
//import Spinner from './styles/Spinner';
//import Error from './ErrorMessage';
import User,{ CURRENT_USER_QUERY } from './User';


// const LOCAL_STATE_QUERY = gql`
//   query {
//     cartOpen @client
//   }
// `;

// const TOGGLE_CART_MUTATION = gql`
//   mutation {
//     toggleCart @client
//   }
// `;

const SIGNIN_MUTATION = gql`
  mutation SIGNIN_MUTATION($email: String!, $password: String!) {
    signIn(email: $email, password: $password) {
      id
      email
      name
    }
  }
`;

const SignupPromt = styled.div`
  /* text-align: center;
  font-size: 1rem;
  margin: 1rem 0;
  p {
    margin: 0;
  }
  a {
    background: lightgrey;
    text-transform: uppercase;
    font-weight: 800;
    font-size: 1em;
    cursor: pointer;
    color: ${props => props.theme.black};
  } */
`;

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
    max-height: 300px;
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
          line-height: 0;
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
// const Composed = adopt({
//   user: ({render}) => <User>{render}</User>,
//   toggleCart: ({render}) => <Mutation mutation={TOGGLE_CART_MUTATION}>{render}</Mutation>,
//   localState: ({render}) => <Query query={LOCAL_STATE_QUERY}>{render}</Query>,
// });
/* eslint-enable */

class Login extends Component {
  state = {
    email: '',
    //name: '',
    password: '',
    loading: false,
  };

  enableEdit = val => {
    console.log('Login enableEdit');
    // if (val === '1') {
    //   this.setState({
    //     showEdit: '1',
    //     readOnly: false,
    //   });
    // } else {
    //   this.setState({
    //     showEdit: '',
    //     readOnly: true,
    //     postItem: this.props.postItem,
    //   });
    // }
  };

  saveToState = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    // console.log('Signin this.props: ', this.props);
    // console.log('Signin this.state: ', this.state);
    return (
      <Mutation
        mutation={SIGNIN_MUTATION}
        variables={{email: this.state.email, password: this.state.password,}}
        refetchQueries={[{ query: CURRENT_USER_QUERY }]}
      >
        {(signIn, { error, loading }) => (
          <RowDiv className="login-background">
          <div className="blur">
            <FormDiv>
              <Form
                method="post"
                onSubmit={async e => {
                  console.log('Signin onSubmit-> e ', e);
                  e.preventDefault();
                  // if (loading) {
                  //   this.setState({ loading });
                  // }
                  console.log('Signin this.state: ', this.state);
                  const res = await signIn();
                  console.log('signIn -> render -> res', res);
                  console.log('Signin this.props: ', this.props);
                  this.props.handleRes(res);
                  this.setState({ email: '', name: '', password: '' }, () => {
                    // console.log('TCL: signin -> setState clear');
                    // Router.push({
                    //   pathname: '/',
                    // });
                  });
                }}
              >
                <fieldset disabled={loading} aria-busy={loading}>
                  {/* <Error error={error} /> */}
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
                      <Button.Group compact fluid>
                        <Button
                        type="submit"
                        positive
                        >
                        <span>Войти</span>
                        </Button>
                        <Button.Or text=' ' />
                        <Button
                        onClick={() => this.enableEdit('1')}
                         //positive
                         >
                         <span>Зарегистрироваться</span>
                         </Button>
                      </Button.Group>
                        {/* <button
                          type="submit"
                          className="ant-btn ant-btn-primary login-form-button "
                        >
                          <span>Войти</span>
                        </button> */}
                        {/* <Link href="#">
                          <a>Зарегистрироваться</a>
                        </Link> */}
                      </span>
                    </div>
                  </div>
                </fieldset>

              </Form>
            </FormDiv>
            </div>
          </RowDiv>
        )}
      </Mutation>
    );
  }
}


//const Login = () => (
  // <Composed>
  //   {({ user, toggleCart, localState }) => {
  //     const { me } = user.data;
  //     if (!me) return null;
  //     return (
  //       <CartStyles open={localState.data.cartOpen}>
  //         <header>
  //           <CloseButton onClick={toggleCart} title="close">
  //             ❌
  //           </CloseButton>
  //           <Supreme>{me.name}'s Cart</Supreme>
  //           <p>
  //             You Have {me.cart.length} Item
  //             {me.cart.length === 1 ? '' : 's'} in your cart
  //           </p>
  //         </header>
  //         <ul>
  //           {me.cart.map(cartItem => (
  //             <CartItem key={cartItem.id} cartItem={cartItem} />
  //           ))}
  //         </ul>
  //         <footer>
  //           <p>{formatMoney(calcTotalPrice(me.cart))}</p>
  //           {me.cart.length && (
  //             <TakeMyMoney>
  //               <SickButton>Checkout</SickButton>
  //             </TakeMyMoney>
  //           )}
  //         </footer>
  //       </CartStyles>
  //     );
  //   }}
  // </Composed>
//);


export default Login;
//export { LOCAL_STATE_QUERY, TOGGLE_CART_MUTATION };
