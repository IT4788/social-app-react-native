import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import AppText from '../../../components/AppText';
import ExTouchableOpacity from '../../../components/ExTouchableOpacity';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import NotificationList from '../../../components/NotificationList';
import { reactionTypes } from '../../../constants';
import { useQuery } from '@tanstack/react-query';
import { useAuthContext } from '../../../context/AuthContext';
import { getNotifications } from '../../../services/notification';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

// function mapType(type) {
//   switch (type) {
//     case 'new_comment_on_post':
//       return notificationTypes.ANYONE_COMMENT_POST_OF_ANYONE_TOO;
//     case 'new_post_reaction':
//       return notificationTypes.ANYONE_REACT_YOUR_POST;

//     default:
//       break;
//   }
// }

const NotificationScreen = () => {
  const { user } = useAuthContext();
  const { data } = useQuery(
    ['notifications', user._id],
    () => getNotifications({ perPage: 100 }),
    {
      enabled: !!user._id,
      onSuccess(data) {
        console.log(data);
      },
      select(data) {
        return data.data.data;
      },
    },
  );

  const notifications = (data?.notifications || []).map((noti) => {
    return {
      id: noti._id,
      create_at: dayjs(noti.createdAt).fromNow(),
      reactionType:
        noti.type === 'new_post_reaction' ? reactionTypes.LIKE : null,
      type: noti.type,
      content: noti.content,
      avatar: noti.avatar,
      linkPost: noti.linkPost,
    };
  });

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
      {notifications?.length ? (
        <>
          <AppText style={styles.notiTitle}>New</AppText>
          <NotificationList notifications={notifications.slice(0, 2)} />
          {/* <VerticalRecommendFriends /> */}
          <AppText style={styles.notiTitle}>Before that</AppText>
          <NotificationList notifications={notifications.slice(2)} />
        </>
      ) : null}
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
