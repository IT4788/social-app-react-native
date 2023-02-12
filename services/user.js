import client from './client';

export function getUserProfile(id) {
  return client.get(`user/${id}/profile`);
}

export function updateProfileInfo(data) {
  return client.put('user', data);
}

export function changePassword(data) {
  return client.patch('user/change_password', data);
}

export function getSuggestedFriend(config) {
  return client.get('user/suggest', { params: config });
}
