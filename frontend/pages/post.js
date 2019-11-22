import React from 'react';
import Post from '../components/Post';
import UserBlog from '../components/UserBlog';

const PostPage = ({ query }) => {
  if (query.id) {
    return <Post  id={query.id}/>;
  }
  return <UserBlog />;
};

export default PostPage;