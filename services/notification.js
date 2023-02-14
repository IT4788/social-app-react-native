import client from './client';

export const getNotifications = (config) => {
  return client.get('notifications', { params: config });
};
