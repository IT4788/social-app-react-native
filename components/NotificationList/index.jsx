import React from 'react';
import { StyleSheet, View } from 'react-native';
import NotificationItem from './NotificationItem';

const NotificationList = ({ notifications = [] }) => {
  if (notifications.length === 0) return <View></View>;

  return (
    <View style={styles.container}>
      {notifications.map((notification, index) => (
        <NotificationItem key={index} item={notification} />
      ))}
    </View>
  );
};

export default NotificationList;

const styles = StyleSheet.create({
  container: {},
});
