import client from './client';

export const createReaction = (data) => {
  return client.post('post_reaction', data);
};
