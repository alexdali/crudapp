import React, { Component } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import Link from 'next/link';
import styled from 'styled-components';
//import NProgress from 'nprogress';
import Router from 'next/router';
import {
  Input,
  Menu,
  Responsive,
  Image,
  Dropdown,
  // Header,
  Icon,
} from 'semantic-ui-react';
//import User, { CURRENT_USER_QUERY } from './User';
//import SigninModal from './SigninModal';
import Login from './Login';

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
      login: true,
    };
  }

  handleRes=(res) => {
    console.log('NavBar handleRes res: ', res);
    if (res) {
      this.setState({
        login: false,
      });
    }
  };

  handleItemClick = (e, data) => {
    // console.log('NavBar handleItemClick: e', e);
    console.log('NavBar handleItemClick data: ', data);
    const { name } = data;
    if (name === 'login') {
      // this.setState({
      //   signinModal: true,
      // });
    }
    if (name === 'taxservice') {
      // Router.push({
      //   pathname: '/categorytplist',
      // });
    }
  };


  render() {
    // console.log('NavBar render this.state: ', this.state);
    // console.log('Header render  this.props: ', this.props.isMobile);
    const { activeItem, login } = this.state;


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

                  <Menu.Item
                    name="tariffs"
                    as="li"

                    onClick={this.handleItemClick}
                  >
                    <div className="MenuItem">
                      <Link href="/tariffs">
                        <a>Профиль</a>
                      </Link>
                    </div>
                  </Menu.Item>
                  <Menu.Item
                    name="tools"
                    as="li"

                    onClick={this.handleItemClick}
                  >
                    <div className="MenuItem">
                      <Link href="/tools">
                        <a>Сервисы</a>
                      </Link>
                    </div>
                  </Menu.Item>

                </Menu.Menu>
              </Menu>
            </MenuDiv>
            {login &&
            <Login handleRes={this.handleRes}/>}
            </>
    );
  }
}

export default NavBar;
