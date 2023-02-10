import client from './client';

export function getUserProfile(id) {
  return client.get(`user/${id}/profile`);
}
