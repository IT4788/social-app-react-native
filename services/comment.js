import client from './client';

export const getPostComments = (postId, config) => {
  return client.get(`comment/post/${postId}`, { params: config });
};

export const createPostComment = (data) => {
  return client.post('comment', data);
};
