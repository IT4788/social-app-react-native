import { Dimensions } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';

export const SCREEN_HEIGHT = Math.round(Dimensions.get('window').height);
export const SCREEN_WIDTH = Math.round(Dimensions.get('window').width);
export const STATUSBAR_HEIGHT = getStatusBarHeight();

export const notificationTypes = {
  NEW_POST_IN_GROUP: 1,
  NEW_PHOTO_IN_GROUP: 2,
  ANYONE_REACT_YOUR_POST: 3,
  ANYONE_REACT_YOUR_COMMENT: 4,
  ANYONE_ADD_TO_STORY: 5,
  ANYONE_ANSWER_YOUR_COMMENT: 6,
  ANYONE_ACCEPT_YOUR_FRIEND_REQUEST: 7,
  ANYONE_COMMENT_POST_IN_GROUP_TOO: 8,
  ANYONE_COMMENT_POST_OF_ANYONE_TOO: 9,
  ANYONE_TAG_YOU_ON_POST_IN_GROUP: 10,
  ANYONE_TAG_YOU_ON_POST_OF_ANYONE: 11,
  ANYONE_LIVE_STREAM: 12,
  ANYONE_ANSWER_YOUR_COMMENT_IN_GROUP: 13,
};

export const reactionTypes = {
  LIKE: 1,
  LOVE: 2,
  HAHA: 3,
  WOW: 4,
  SAD: 5,
  ANGRY: 6,
};
