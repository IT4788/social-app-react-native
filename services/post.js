import client from './client';

export const addPost = (data) => {
  return client.post('post', data);
};

export const getUserPosts = (userId, config = {}) => {
  return client.get(`post/user/${userId}`, { params: config });
};
