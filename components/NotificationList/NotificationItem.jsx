/* eslint-disable react/display-name */
import React from 'react';
import { ImageBackground, StyleSheet, View } from 'react-native';
import {
  notificationTypes,
  reactionTypes,
  SCREEN_WIDTH,
} from '../../constants';
import AppText from '../AppText';
import ExTouchableOpacity from '../ExTouchableOpacity';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';

const NotificationItem = ({ item }) => {
  let displayAvatarUri, Description, icon;
  if (
    item.type === notificationTypes.NEW_PHOTO_IN_GROUP ||
    item.type === notificationTypes.NEW_POST_IN_GROUP
  )
    displayAvatarUri = item.group.avatar_url;
  else displayAvatarUri = item.user.avatar_url;
  let iconName, iconColor;
  switch (item.reactionType) {
    case reactionTypes.LIKE:
      iconName = 'thumbs-up';
      iconColor = '#318bfb';
      break;
    case reactionTypes.LOVE:
      iconName = 'heart';
      iconColor = '#e8304a';
      break;
    case reactionTypes.HAHA:
      iconName = 'grin-squint';
      iconColor = '#f7ca51';
      break;
    case reactionTypes.WOW:
      iconName = 'surprise';
      iconColor = '#f7ca51';
      break;
    case reactionTypes.SAD:
      iconName = 'sad-tear';
      iconColor = '#f7ca51';
      break;
    case reactionTypes.ANGRY:
      iconName = 'angry';
      iconColor = '#dc4311';
      break;
  }
  switch (item.type) {
    case notificationTypes.ANYONE_ACCEPT_YOUR_FRIEND_REQUEST:
      icon = {
        name: 'user',
        color: '#fff',
        size: 14,
        bgColor: '#318bfb',
      };
      Description = () => (
        <AppText style={styles.pureTxt}>
          <AppText style={styles.hightlightTxt}>{item.user.name}</AppText>{' '}
          accept your friend request.
        </AppText>
      );
      break;
    case notificationTypes.ANYONE_ADD_TO_STORY:
      icon = {
        name: 'image',
        color: '#fff',
        size: 14,
        bgColor: '#318bfb',
      };
      Description = () => (
        <AppText style={styles.pureTxt}>
          <AppText style={styles.hightlightTxt}>{item.user.name}</AppText> added
          to my story.
        </AppText>
      );
      break;
    case notificationTypes.ANYONE_ANSWER_YOUR_COMMENT:
      icon = {
        name: 'comment-alt',
        color: '#fff',
        size: 14,
        bgColor: '#63BE09',
      };
      Description = () => (
        <AppText style={styles.pureTxt}>
          <AppText style={styles.hightlightTxt}>{item.user.name}</AppText>{' '}
          replied your comment.
        </AppText>
      );
      break;
    case notificationTypes.ANYONE_ANSWER_YOUR_COMMENT_IN_GROUP:
      icon = {
        name: 'comment-alt',
        color: '#fff',
        size: 14,
        bgColor: '#63BE09',
      };
      Description = () => (
        <AppText style={styles.pureTxt}>
          <AppText style={styles.hightlightTxt}>{item.user.name}</AppText>{' '}
          replied your comment in group{' '}
          <AppText style={styles.hightlightTxt}>{item.group.name}</AppText>.
        </AppText>
      );
      break;
    case notificationTypes.ANYONE_COMMENT_POST_IN_GROUP_TOO:
      icon = {
        name: 'comment-alt',
        color: '#fff',
        size: 14,
        bgColor: '#318bfb',
      };
      Description = () => (
        <AppText style={styles.pureTxt}>
          <AppText style={styles.hightlightTxt}>{item.user.name}</AppText>{' '}
          commented in a post which you followed in group{' '}
          <AppText style={styles.hightlightTxt}>{item.group.name}</AppText> too.
        </AppText>
      );
      break;
    case notificationTypes.ANYONE_COMMENT_POST_OF_ANYONE_TOO:
      icon = {
        name: 'comment-alt',
        color: '#fff',
        size: 14,
        bgColor: '#63BE09',
      };
      Description = () => (
        <AppText style={styles.pureTxt}>
          <AppText style={styles.hightlightTxt}>{item.user.name}</AppText>{' '}
          commented in{' '}
          <AppText style={styles.hightlightTxt}>{item.ownUser?.name}</AppText>
          &apos;s post too.
        </AppText>
      );
      break;
    case notificationTypes.ANYONE_LIVE_STREAM:
      icon = {
        name: 'video',
        color: '#fff',
        size: 14,
        bgColor: '#e8343d',
      };
      Description = () => (
        <AppText style={styles.pureTxt}>
          <AppText style={styles.hightlightTxt}>{item.user.name}</AppText> lived
          stream.
        </AppText>
      );
      break;
    case notificationTypes.ANYONE_REACT_YOUR_COMMENT:
      icon = {
        name: iconName,
        color: iconColor,
        size: 24,
      };
      Description = () => (
        <AppText style={styles.pureTxt}>
          <AppText style={styles.hightlightTxt}>{item.user.name}</AppText> and{' '}
          {item.remainingCount} another people react your comment.
        </AppText>
      );
      break;
    case notificationTypes.ANYONE_REACT_YOUR_POST:
      icon = {
        name: iconName,
        color: iconColor,
        size: 24,
      };
      Description = () => (
        <AppText style={styles.pureTxt}>
          <AppText style={styles.hightlightTxt}>{item.user.name}</AppText> and{' '}
          {item.remainingCount} another people react your post.
        </AppText>
      );
      break;
    case notificationTypes.ANYONE_TAG_YOU_ON_POST_IN_GROUP:
      icon = {
        name: 'comment-alt',
        color: '#fff',
        size: 14,
        bgColor: '#63BE09',
      };
      Description = () => (
        <AppText style={styles.pureTxt}>
          <AppText style={styles.hightlightTxt}>{item.user.name}</AppText>{' '}
          tagged you in a comment in group{' '}
          <AppText style={styles.hightlightTxt}>{item.group.name}</AppText>.
        </AppText>
      );
      break;
    case notificationTypes.ANYONE_TAG_YOU_ON_POST_OF_ANYONE:
      icon = {
        name: 'comment-alt',
        color: '#fff',
        size: 14,
        bgColor: '#63BE09',
      };
      Description = () => (
        <AppText style={styles.pureTxt}>
          <AppText style={styles.hightlightTxt}>{item.user.name}</AppText>{' '}
          tagged you in a comment in{' '}
          <AppText style={styles.hightlightTxt}>{item.ownUser?.name}</AppText>
          &apos;s post.
        </AppText>
      );
      break;
    case notificationTypes.NEW_PHOTO_IN_GROUP:
      icon = {
        name: 'users',
        color: '#fff',
        size: 14,
        bgColor: '#318bfb',
      };
      Description = () => {
        return (
          <AppText style={styles.pureTxt}>
            <AppText style={styles.hightlightTxt}>{item.user.name}</AppText>{' '}
            post a new photo in group{' '}
            <AppText style={styles.hightlightTxt}>{item.group.name}</AppText>.
          </AppText>
        );
      };
      break;
    case notificationTypes.NEW_POST_IN_GROUP:
      icon = {
        name: 'users',
        color: '#fff',
        bgColor: '#318bfb',
      };
      Description = () => {
        return (
          <AppText style={styles.pureTxt}>
            <AppText style={styles.hightlightTxt}>{item.user.name}</AppText>{' '}
            post a new post in group{' '}
            <AppText style={styles.hightlightTxt}>{item.group.name}</AppText>.
          </AppText>
        );
      };
      break;
  }

  return (
    <View style={{ backgroundColor: 'rgba(0,0,0,0.3)' }}>
      <ExTouchableOpacity
        // onPress={this.onPressNotificationHandler.bind(this)}
        // onLongPress={this.onShowNotificationOptionsHandler.bind(
        //   this,
        //   Description,
        // )}
        style={{
          ...styles.container,
          backgroundColor: item.isSeen ? '#fff' : '#edf2fa',
        }}
      >
        <ImageBackground
          imageStyle={{ borderRadius: 64 }}
          style={styles.avatar}
          source={{ uri: displayAvatarUri }}
        >
          <View
            style={{
              ...styles.notificationIcon,
              backgroundColor: icon.bgColor,
            }}
          >
            <FontAwesome5Icon
              name={icon.name}
              size={icon.size}
              color={icon.color}
            />
          </View>
        </ImageBackground>
        <View style={styles.contentWrapper}>
          <Description />
          <AppText style={{ color: '#333' }}>{item.create_at}</AppText>
        </View>
        <ExTouchableOpacity
          // onPress={this.onShowNotificationOptionsHandler.bind(
          //   this,
          //   Description,
          // )}
          style={styles.btnOptions}
        >
          <FontAwesome5Icon name="ellipsis-h" />
        </ExTouchableOpacity>
      </ExTouchableOpacity>
    </View>
  );
};

export default NotificationItem;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    flexDirection: 'row',
  },
  avatar: {
    height: 64,
    width: 64,
    position: 'relative',
    borderRadius: 64,
    borderColor: '#ddd',
    borderWidth: 0.5,
  },
  contentWrapper: {
    width: SCREEN_WIDTH - 40 - 30 - 64,
    paddingHorizontal: 10,
  },
  mainContent: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  btnOptions: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignContent: 'center',
  },
  pureTxt: {
    fontSize: 16,
  },
  hightlightTxt: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  notificationIcon: {
    position: 'absolute',
    bottom: -5,
    right: -5,
    height: 25,
    width: 25,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
