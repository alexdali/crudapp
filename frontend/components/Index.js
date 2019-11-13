import React from 'react';
import { Query, graphql } from 'react-apollo';
import gql from 'graphql-tag';
import styled from 'styled-components';
import {
  Grid, Segment, Image, Icon,
} from 'semantic-ui-react';
import UserContext from './UserContext';
import PostList from './PostList';
import ProfileSidebar from './ProfileSidebar';
import User, { CURRENT_USER_QUERY } from './User';

const IndexDiv = styled.div`
  margin: 52px 0 0;
`;

const withCurrentUserQuery = graphql(gql`
  query {
    me {
      id
      email
      name
    }
  }
`, {
  props: ({ data, loading }) => {
    if (loading || !data.me) return undefined;
    // console.log('withCurrentUserQuery  data: ', data);
    if (!loading && data.me) return data;
    // {
    //   // user: ()=> {
    //   ,
    //        //   return data;
    //   // },
    //   ,
    // }
  },
});

const Main = (props) => (
  <User>
    {({ data, error, loading }) => {
      console.log('Index props: ', props);
      return (
      <IndexDiv>
        <Grid celled='internally'>
          <Grid.Row>
            <Grid.Column width={3}>
            <Segment>1</Segment>
              <Segment>2</Segment>
              <Segment>1</Segment>
              <Segment>2</Segment>
            </Grid.Column>
            <Grid.Column width={10}>
              <PostList/>
            </Grid.Column>
            <Grid.Column width={3}>
              <ProfileSidebar/>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </IndexDiv>);
    }}
  </User>);

class IndexHome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // user: this.props.user,
      user: '',
    };
  }

  async componentDidMount() {
    // const { client } = this.props;
    const { me } = this.props;
    // const userData = client.readQuery({ query: CURRENT_USER_QUERY });
    // const userId = userData === undefined ? '' : userData.me.id;
    // const user = await this.updateCurrentUser();
    // const user = await this.props.user();
    // console.log('Index componentDidMount userId: ', user.me);
    // this.setState({
    //   user,
    // })
    console.log('Index componentDidMount me: ', me);
    if (me) {
      this.setState({
        user: me,
      });
    }
  }

  // updateCurrentUser = async ()=> {
  //   const { client } = this.props;
  //   const userData = await client.readQuery({ query: CURRENT_USER_QUERY }) || '';
  //   //console.log('Index updateCurrentUser userData: ', userData);
  //   // const user = userData === undefined ? '' : (userData.me ? userData.me : '');
  //   // const user = userData.me ? userData.me : '';
  //   // //const user = userData.me;
  //   // console.log('Index updateCurrentUser userId: ', user.id);
  //   // return user;
  //   return userData;
  // }


  render() {
    console.log('Index render  this.props: ', this.props);
    console.log('Index render  this.state.user: ', this.state.user);
    // const Main = this.getMain();
    return (
      <User>
        {({ data, error, loading }) => {
          // if (loading) return <p>Loading...</p>;
          // const { me } = user.data;
          // if (!me) return null;
          // console.log('User data', data);
          console.log('User loading', loading);
          return (
            loading ? (
            <div>
              <p>
              Загрузка...
              <i className="spinner icon"></i>
              </p>
            </div>
            )
              : (
            /* <ApolloConsumer>
            {client => ( */
              <UserContext.Provider value={{ user: this.state.user }}>
              <Main/>
              {/* <IndexDiv>
                <Grid celled='internally'>
                  <Grid.Row>
                    <Grid.Column width={3}>
                    <Segment>1</Segment>
                      <Segment>2</Segment>
                      <Segment>1</Segment>
                      <Segment>2</Segment>
                    </Grid.Column>
                    <Grid.Column width={10}>
                      <PostList/>
                    </Grid.Column>
                    <Grid.Column width={3}>
                      <ProfileSidebar/>
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </IndexDiv> */}
              </UserContext.Provider>
            /* )}
          </ApolloConsumer> */
              )
          );
        }}
      </User>
    );
  }
}

const Index = withCurrentUserQuery(Main);

export default Index;
