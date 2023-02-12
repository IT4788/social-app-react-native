import client from './client';

export const addPost = (data) => {
  return client.post('post', data);
};

export const getUserPosts = (userId, config = {}) => {
  return client.get(`post/user/${userId}`, { params: config });
};

export const getNewFeeds = (config) => {
  return client.get('newfeeds/new', { params: config });
};

export const getPostDetail = (postId) => client.get(`post/${postId}`);
