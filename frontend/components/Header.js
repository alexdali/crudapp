import React, { Component } from 'react';
import Link from 'next/link';
import styled from 'styled-components';
//import NProgress from 'nprogress';
import Router from 'next/router';
import {
  Responsive,
  Image,
  // Header,
  // Segment,
} from 'semantic-ui-react';

import NavBar from './NavBar';

// const handleRouteChangeStart = () => {
//   NProgress.start();
// };

// const handleRouteChangeCompleteAndError = () => {
//   NProgress.done();
// };

// Router.events.on('routeChangeStart', handleRouteChangeStart);
// Router.events.on('routeChangeComplete', handleRouteChangeCompleteAndError);
// Router.events.on('routeChangeError', handleRouteChangeCompleteAndError);


const HeaderDiv = styled.div`
  background: #fff;
  width: 100%;
  z-index: 1;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  /* position: relative; */
  position: absolute;
  top: 0;
  /* display: flex; */
  /* margin: 3px 0 1px 0; */
  /* justify-content: space-between; */
  /* height: min-content; */
  /* border-bottom: 1px solid grey; */
  /* overflow: hidden; */
  .home-page {
    height: 100%;
    max-width: 1200px;
    position: relative;
    margin: auto;
    /* will-change: transform; */
    .logo {
    /* display: inline-block;
    position: relative;
    width: 100px;
    line-height: 64px; */
    float: left;
    margin: 0 25px 0;
    cursor: pointer;
    }
     /* font-size: 3em; */
    img {
      width: 7rem;
      margin-top: 0.5rem;
    }
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
  .ui.right.floated.menu {
    /* margin: 10px 0 0 0.5rem; */
    margin: 0.8rem 2rem 0 0.5rem;
  }
  .ui.secondary.menu .dropdown.item:hover,
  .ui.secondary.menu .link.item:hover,
  .ui.secondary.menu a.item:hover {
    background: none;
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


class HeaderBar extends React.Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //   };
  // }
  render() {
    return (
      <HeaderDiv>
        <div className="home-page">
          <header className="logo">
            <Link href="/"> 
              <img src="/logo.png" alt="logo" />
            </Link>
          </header>
          <NavBar />
        </div>
      </HeaderDiv>
    );
  }
}

export default HeaderBar;
