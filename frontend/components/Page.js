import React, { Component, createRef } from 'react';
import { Grid } from 'semantic-ui-react';
import styled, { ThemeProvider, createGlobalStyle } from 'styled-components';
import Header from './Header';
import Meta from './Meta';
import RightSideBar from './RightSideBar';

const theme = {
  red: '#FF0000',
  black: '#393939',
  grey: '#3A3A3A',
  lightgrey: '#E1E1E1',
  offWhite: '#EDEDED',
  maxWidth: '1200px',
  bs: '0 12px 24px 0 rgba(0, 0, 0, 0.09)',
};

const StyledPage = styled.div`
  background: white;
  color: ${(props) => props.theme.black};
`;

const Inner = styled.div`
  {/*max-width: ${(props) => props.theme.maxWidth};
    margin: 0 auto;
    padding: 2rem;*/}
`;

const IndexDiv = styled.div`
  margin: 52px 0 0;
  max-width: ${(props) => props.theme.maxWidth};
  padding: 2rem;
  .ui.celled.grid>.row>.column {
    padding: 0 1rem;
}
`;

const GlobalStyle = createGlobalStyle`
     html {
        box-sizing: border-box;
        font-size: 10px;
    }
    *, *:before, *:after {
        box-sizing: inherit;
    }
    body {
        padding: 0;
        margin: 0;
        font-size: 1.5rem;
        line-height: 2;
        ${''}
    }
    a {
        text-decoration: none;
        color: ${theme.black};
    }
`;

class Page extends Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <StyledPage>
          <Meta />
          <Header />
          <IndexDiv>
            <Grid celled='internally'>
              <Grid.Row>
                <Grid.Column width={13}>
                  <Inner>{this.props.children}</Inner>
                </Grid.Column>
                <Grid.Column width={3}>
                  <RightSideBar/>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </IndexDiv>
          <GlobalStyle />
        </StyledPage>
      </ThemeProvider>
    );
  }
}

export default Page;
