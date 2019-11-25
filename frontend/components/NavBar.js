import React, { Component } from 'react';
import { Query } from 'react-apollo';
import Link from 'next/link';
import styled from 'styled-components';
// import NProgress from 'nprogress';
import Router from 'next/router';
import { Menu, Label, Icon } from 'semantic-ui-react';
import withUserContext from '../lib/withUserContext';
import { CURRENT_USER_QUERY } from './User';
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
      // console.log('NavBar handleRes res.data.signIn: ', res.data.signIn);
      this.setState({
        login: false,
      },
      // () => {
      //   this.props.setCurrentUser();
      // }
      );
    }
  };

  closeLoginForm = () => {
    console.log('NavBar closeLoginForm');
    this.setState({
      login: false,
    });
  };

  handleItemClick = (e, data) => {
    // console.log('NavBar handleItemClick: e', e);
    // console.log('NavBar handleItemClick data: ', data);
    const { name } = data;
    if (name === 'login') {
      this.setState({
        login: true,
      });
    }
    if (name === 'logout') {
      Router.push({
        pathname: '/',
      });
    }
  };


  render() {
    const { login } = this.state;
    const { user } = this.props;
    return (
      <Query query={CURRENT_USER_QUERY}>
        {({ data, loading, error }) => {
          if (error) return (<ErrorMessage error={'Ошибка! Отсутствует соединение с базой данных'}/>);
          if (typeof data === 'undefined') return null;
          // console.log('NavBar render UserContextConsumer user: ', user);
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
                            <Link href="/profile">
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
            && <Login handleRes={this.handleRes} closeLoginForm={this.closeLoginForm}/>
            }
            </>
          );
        }}
      </Query>
    );
  }
}

export default withUserContext(NavBar);
