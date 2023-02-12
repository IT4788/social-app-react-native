import client from './client';

export const createFriendRequest = (userId) => {
  return client.post(`friend/${userId}`);
};

export const cancelFriendRequest = (userId) => {
  return client.delete(`friend/${userId}`);
};

export const deleteFriend = (userId) => {
  return client.delete(`friend/destroy/${userId}`);
};

export function getRequestingFriend(config) {
  return client.get('friend/requested/sent', { params: config });
}

export function getRequestedFriend(config) {
  return client.get('friend/requested/recieved', { params: config });
}

export function approveRequest(userId) {
  return client.patch(`friend/approve/${userId}`);
}

export function rejectRequest(userId) {
  return client.patch(`friend/reject/${userId}`);
}

export function getUserFriends(userId, config) {
  return client.get(`friend/list/${userId}`, { params: config });
}
