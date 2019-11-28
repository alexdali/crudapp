import React from 'react';
import Link from 'next/link';
// import NProgress from 'nprogress';
// import Router from 'next/router';
import NavBar from './NavBar';
import HeaderDiv from './styles/HeaderStyle';

// const handleRouteChangeStart = () => {
//   NProgress.start();
// };

// const handleRouteChangeCompleteAndError = () => {
//   NProgress.done();
// };

// Router.events.on('routeChangeStart', handleRouteChangeStart);
// Router.events.on('routeChangeComplete', handleRouteChangeCompleteAndError);
// Router.events.on('routeChangeError', handleRouteChangeCompleteAndError);

const HeaderBar = () => (
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

export default HeaderBar;
