import React from 'react';
import Post from '../components/Post';

const PostPage = ({ query }) => <Post  id={query.id}/>;

export default PostPage;