import React from 'react';
import Post from '../components/Post';
import CreateBlock from '../components/CreateBlock';

//const { id } = props.query;

// if (id) {
//   const PostPage = ({ query }) => <Post  id={query.id}/>;
// } else {
//   const PostPage = props => <CreateBlock />;
// }


const PostPage = ({ query }) => {
  if (query.id) {
    return <Post  id={query.id}/>;
  }
  return <CreateBlock />;
};

//const PostPage = ({ query }) => <Post  id={query.id}/>;

export default PostPage;