import React from 'react';
import { BsMoonFill, BsSunFill } from 'react-icons/bs';
import { useMainContext } from '../context/mainContext';
import Post from './Post';

const Feed = ({ posts }) => {
  return (
    <div className="mx-auto mt-3 posts">
      {posts.map((post) => (
        <div className="post mt-1" key={post.id}>
          <Post id={post.id} post={post.data()} />
        </div>
      ))}
    </div>
  );
};

export default Feed;
