import React from 'react';
import Post from '../../../../components/Post';

const Feed = () => {
  return (
    <>
      {Array(6)
        .fill(1)
        .map((_, index) => (
          <Post key={index} />
        ))}
    </>
  );
};

export default Feed;
