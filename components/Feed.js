import React from 'react';
import Post from './Post';

const Feed = ({ posts }) => {
  return (
    <div className="mx-auto my-4 posts">
      {posts.map((post) => (
        <Post key={post.id} id={post.id} post={post.data()} />
      ))}
    </div>
  );
};

export default Feed;
