import client from './client';

export const addPost = (data) => {
  return client.post(data);
};
