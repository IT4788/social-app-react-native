import React from 'react';
import { StyleSheet, View, TouchableOpacity, Image } from 'react-native';
import ExTouchableOpacity from '../../components/ExTouchableOpacity';
import { SCREEN_WIDTH } from '../../constants';
import { useAuthContext } from '../../context/AuthContext';
import * as navigation from '../../navigation/helpers';
import { getUserAvatar } from '../../utils/image';
import AppText from '../AppText';

const FriendsShowing = ({
  userId,
  friends,
  isUserX,
  totalFriend,
  mututalCount,
}) => {
  const { user } = useAuthContext();

  function onPressViewAllFriendsHandler() {
    navigation.push('FullFriends', { id: userId });
  }

  return (
    <View style={styles.friendsWrapper}>
      <View style={{ backgroundColor: '#000', borderRadius: 5 }}>
        <TouchableOpacity
          onPress={onPressViewAllFriendsHandler}
          activeOpacity={0.8}
          style={styles.friendsBar}
        >
          <View>
            <AppText style={{ fontSize: 20, fontWeight: 'bold' }}>
              Friends
            </AppText>
            <AppText
              style={{
                fontSize: 16,
                marginTop: 4,
                fontWeight: '500',
                color: '#333',
              }}
            >
              {totalFriend} {totalFriend > 1 ? 'Friends' : 'Friend'}
              {(isUserX === true) & (mututalCount > 0)
                ? ` (${mututalCount} mutual ${
                    mututalCount > 1 ? 'friends' : 'friend'
                  })`
                : ''}
            </AppText>
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.friendGallery}>
        {friends.slice(0, 6).map((friend) => (
          <View key={friend._id} style={styles.friendItem}>
            <ExTouchableOpacity
              activeOpacity={0.8}
              onPress={() => {
                if (friend._id === user?._id) {
                  navigation.push('Profile');
                  return;
                }

                navigation.push('ProfileX', { id: friend._id });
              }}
            >
              <Image
                source={{ uri: getUserAvatar(friend) }}
                style={styles.friendAvatar}
              />
            </ExTouchableOpacity>
            <ExTouchableOpacity style={{ marginTop: 5 }}>
              <AppText
                numberOfLines={1}
                style={{ fontSize: 16, fontWeight: '500' }}
              >
                {friend.username}
              </AppText>
            </ExTouchableOpacity>
          </View>
        ))}
      </View>
      <TouchableOpacity
        onPress={onPressViewAllFriendsHandler}
        activeOpacity={0.8}
        style={styles.btnViewAllFriends}
      >
        <AppText style={{ fontSize: 16, fontWeight: '500' }}>
          View all friends
        </AppText>
      </TouchableOpacity>

      {!isUserX && (
        <TouchableOpacity
          onPress={() => {
            navigation.push('RequestedFriends');
          }}
          activeOpacity={0.8}
          style={styles.btnViewAllFriends}
        >
          <AppText style={{ fontSize: 16, fontWeight: '500' }}>
            View requested friends
          </AppText>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default FriendsShowing;

const styles = StyleSheet.create({
  friendsWrapper: {
    paddingVertical: 15,
  },
  friendsBar: {
    borderRadius: 6,
    paddingVertical: 10,
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  btnFindFriends: {
    paddingHorizontal: 11,
  },
  friendGallery: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    // justifyContent: 'space-between',
  },
  friendItem: {
    width: (SCREEN_WIDTH - 30 - 20) / 3,
    marginBottom: 15,
    marginRight: 15,
  },
  friendAvatar: {
    width: (SCREEN_WIDTH - 30 - 20) / 3,
    height: (SCREEN_WIDTH - 30 - 20) / 3,
    borderRadius: 10,
    borderWidth: 0.2,
    borderColor: '#333',
  },
  btnViewAllFriends: {
    width: '100%',
    borderRadius: 5,
    height: 40,
    backgroundColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
});
