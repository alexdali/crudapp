import React, { Component } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import Link from 'next/link';
import styled from 'styled-components';
// import NProgress from 'nprogress';
import Router from 'next/router';
import {
  Input,
  Menu,
  Responsive,
  Image,
  Label,
  Icon,
} from 'semantic-ui-react';
import withUserContext from '../lib/withUserContext';
import User, { CURRENT_USER_QUERY } from './User';
import SignOut from './SignOut';
import Login from './Login';
import ErrorMessage from './ErrorMessage';

// const handleRouteChangeStart = () => {
//   NProgress.start();
// };

// const handleRouteChangeCompleteAndError = () => {
//   NProgress.done();
// };

// Router.events.on('routeChangeStart', handleRouteChangeStart);
// Router.events.on('routeChangeComplete', handleRouteChangeCompleteAndError);
// Router.events.on('routeChangeError', handleRouteChangeCompleteAndError);

const RowDiv = styled.div`
  .logo {
    float: left;
    margin: 0 25px 0;
    /* font-size: 3em; */
    img.image {
      /* width: 160px; */
      width: 11rem;
    }
  }
  .ui.floated.header {
    /* margin-top: 5px; */
    /* margin-top: 0.3em; */
  }

  .ui.menu {
    font-family: 'Montserrat Alternates', 'Roboto', 'Open Sans', sans-serif,
      'Arial';
  }

  /* .ui.secondary.menu .dropdown.item > .dropdown-sub-menu {
    margin-top: 0;
  } */
  .ui.right.floated.menu {
    /* margin: 10px 0 0 0.5rem; */
    margin: 0.8rem 2rem 0 0.5rem;
  }

  /* .ui.secondary.menu .dropdown.item:hover,
  .ui.secondary.menu .link.item:hover,
  .ui.secondary.menu a.item:hover {
    background: none;
  } */

  .ui.secondary.menu {
    /* .right.menu {
      .item.dropdown > .menu {
        margin-top: 0;
      }
    } */

    .dropdown.item:hover,
    .link.item:hover,
    a.item:hover {
      background: none;
    }
    .ui.menu .ui.dropdown .menu > .item:hover {
      background: none !important;
    }
    .dropdown-sub-menu:active {
      display: none;
    }
  }
  .MenuItem {
    cursor: pointer;
    &:after {
      height: 2px;
      background: #1ab394;
      content: '';
      width: 0;
      position: absolute;
      transform: translateX(-50%);
      transition: width 0.4s;
      transition-timing-function: cubic-bezier(1, -0.65, 0, 2.31);
      left: 50%;
      margin-top: 0.5rem;
    }
    &:hover,
    &:focus {
      background: none;
      outline: none;
      color: #1ab394;
      font-weight: 600;
      &:after {
        width: calc(100% - 10px);
      }
      @media (max-width: 700px) {
        width: calc(100% - 10px);
      }
    }
    a {
      padding: 0 0.5rem;
      display: flex;
      align-items: center;
      position: relative;
      /* text-transform: uppercase; */
      /* font-weight: 900; */
      /* font-weight: 600; */
      /* font-size: 1em; */
      background: none;
      border: 0;
      cursor: pointer;
      /* color: #1ab394; */
      @media (max-width: 700px) {
        /* font-size: 10px; */
        padding: 0 10px;
      }
    }
  }
`;
const MenuDiv = styled.div`
  .ui.simple.dropdown .menu {
    opacity: 0;
  }

  .ui.simple.active.dropdown > .menu,
  .ui.simple.dropdown:hover > .menu {
    opacity: 1;
    top: 95% !important;
    margin-top: 0;
  }

  .ui.menu .ui.dropdown .menu > .selected.item:active {
    /* background: rgba(0, 0, 0, 0.05) !important;*/
    color: rgba(0, 0, 0, 0.95) !important;
  }
`;


class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: '',
      login: false,
    };
  }

  handleRes = (res) => {
    if (res) {
      console.log('NavBar handleRes res.data.signIn: ', res.data.signIn);
      this.setState({
        login: false,
      },
      // () => {
      //   this.props.setCurrentUser();
      // }
      );
    }
  };

  handleItemClick = (e, data) => {
    // console.log('NavBar handleItemClick: e', e);
    console.log('NavBar handleItemClick data: ', data);
    const { name } = data;
    if (name === 'login') {
      this.setState({
        login: true,
      });
    }
  };


  render() {
    const { activeItem, login } = this.state;
    const { user } = this.props;
    return (
      <Query query={CURRENT_USER_QUERY}>
        {({ data, loading, error }) => {
          if (error) return (<ErrorMessage error={'Ошибка! Отсутствует соединение с базой данных'}/>);
          if (typeof data === 'undefined') return null;
          console.log('NavBar render UserContextConsumer user: ', user);
          return (
            <>
            <MenuDiv>
              <Menu secondary borderless floated="right">
                <Menu.Menu position="right" as="ul">
                  <Menu.Item
                    name="home"
                    as="li"
                    onClick={this.handleItemClick}
                  >
                    <div className="MenuItem">
                      <Link href="/">
                        <a>Главная</a>
                      </Link>
                    </div>
                  </Menu.Item>

                  { loading
                    ? <i className="spinner icon"></i>
                    : <>
                  {data.me
                    && (
                      <>
                        <Menu.Item
                            name="myblog"
                            as="li"
                            onClick={this.handleItemClick}
                          >
                            <div className="MenuItem">
                              <Link href="/post">
                                <a>Мой блог</a>
                              </Link>
                            </div>
                          </Menu.Item>
                          <Menu.Item
                            name="account"
                            as="li"
                            onClick={this.handleItemClick}
                          >
                          <div className="MenuItem">
                            <Link href="#">
                              <a>
                              <Label>
                                <Icon name='user outline' />
                                {user ? user.name : ''}
                              </Label>
                              </a>
                            </Link>
                          </div>
                          </Menu.Item>
                          <Menu.Item
                            name="logout"
                            as="li"
                            onClick={this.handleItemClick}
                          >
                            <div className="MenuItem">
                              <Link href="#">
                                <a>
                                  <SignOut />
                                </a>
                              </Link>
                            </div>
                          </Menu.Item>
                      </>
                    )
                  }
                  {!data.me
                  && (
                    <Menu.Item
                      name="login"
                      as="li"
                      onClick={this.handleItemClick}
                    >
                      <div className="MenuItem">
                        <Link href="#">
                        <a>Войти</a>
                        </Link>
                      </div>
                    </Menu.Item>
                  )}
                    </>
                  }
                </Menu.Menu>
              </Menu>
            </MenuDiv>
            {login
            && <Login handleRes={this.handleRes} />
            }
            </>
          );
        }}
      </Query>
    );
  }
}

export default withUserContext(NavBar);
