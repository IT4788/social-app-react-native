import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import AppText from '../../../components/AppText';
import ExTouchableOpacity from '../../../components/ExTouchableOpacity';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import NotificationList from '../../../components/NotificationList';
import { notificationTypes, reactionTypes } from '../../../constants';

const mockNotis = [
  {
    reactionType: reactionTypes.LIKE,
    type: notificationTypes.ANYONE_REACT_YOUR_POST,
    create_at: '10 mins ago',
    isSeen: true,
    user: {
      name: 'Luong Dao',
      avatar_url:
        'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=046c29138c1335ef8edee7daf521ba50',
    },
  },
  {
    reactionType: reactionTypes.LIKE,
    type: notificationTypes.ANYONE_REACT_YOUR_POST,
    create_at: '10 mins ago',
    user: {
      name: 'Luong Dao',
      avatar_url:
        'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=046c29138c1335ef8edee7daf521ba50',
    },
  },
  {
    reactionType: reactionTypes.LIKE,
    type: notificationTypes.ANYONE_REACT_YOUR_POST,
    create_at: '10 mins ago',
    user: {
      name: 'Luong Dao',
      avatar_url:
        'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=046c29138c1335ef8edee7daf521ba50',
    },
  },
];

const NotificationScreen = () => {
  return (
    <ScrollView
      bounces={false}
      showsVerticalScrollIndicator={false}
      style={styles.container}
    >
      <View style={styles.titleWrapper}>
        <AppText style={styles.title}>Notifications</AppText>
        <ExTouchableOpacity
          // onPress={this.onPressSearchHandler}
          style={styles.btnSearch}
        >
          <FontAwesome5Icon name="search" size={18} />
        </ExTouchableOpacity>
      </View>
      <AppText style={styles.notiTitle}>New</AppText>
      <NotificationList notifications={mockNotis.slice(0, 2)} />
      {/* <VerticalRecommendFriends /> */}
      <AppText style={styles.notiTitle}>Before that</AppText>
      <NotificationList notifications={mockNotis.slice(2)} />
    </ScrollView>
  );
};

export default NotificationScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  titleWrapper: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 40,
    alignItems: 'center',
    marginHorizontal: 20,
  },
  btnSearch: {
    height: 40,
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ddd',
    borderRadius: 40,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  notiTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    margin: 10,
    marginHorizontal: 20,
  },
});
