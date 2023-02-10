import React from 'react';
import { Text, StyleSheet, View, TouchableOpacity, Image } from 'react-native';
import ExTouchableOpacity from '../../components/ExTouchableOpacity';
import { SCREEN_WIDTH } from '../../constants';
import * as navigation from '../../navigation/helpers';

const FriendsShowing = ({ friends, isUserX, myFriends }) => {
  let mututalCount;
  if (isUserX) {
    mututalCount =
      myFriends.filter((friend) => friend.id === userXId)[0]?.mutualFriends ||
      0;
  }

  function onPressViewAllFriendsHandler() {
    navigation.navigate('FullFriends');
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
            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Friends</Text>
            <Text style={{ fontSize: 16, fontWeight: '500', color: '#333' }}>
              {friends.length} friends
              {(isUserX === true) & (mututalCount > 0)
                ? `(${mututalCount} mutual friends)`
                : ''}
            </Text>
          </View>
          {!isUserX && (
            <TouchableOpacity
              // onPress={this.onPressFindFriendsHandler}
              activeOpacity={0.8}
              style={styles.btnFindFriends}
            >
              <Text style={{ fontSize: 16, color: '#318bfb' }}>
                Find friends
              </Text>
            </TouchableOpacity>
          )}
        </TouchableOpacity>
      </View>
      <View style={styles.friendGallery}>
        {friends.splice(0, 6).map((friend, index) => (
          <View key={index} style={styles.friendItem}>
            <ExTouchableOpacity
              // onPress={this.onPressProfileHandler.bind(this, friend.id)}
              activeOpacity={0.8}
            >
              <Image
                source={{ uri: friend.avatar_url }}
                style={styles.friendAvatar}
              />
            </ExTouchableOpacity>
            <ExTouchableOpacity
              // onPress={this.onPressProfileHandler.bind(this, friend.id)}
              style={{ marginTop: 5 }}
            >
              <Text style={{ fontSize: 16, fontWeight: '500' }}>
                {friend.name}
              </Text>
            </ExTouchableOpacity>
          </View>
        ))}
      </View>
      <TouchableOpacity
        onPress={onPressViewAllFriendsHandler}
        activeOpacity={0.8}
        style={styles.btnViewAllFriends}
      >
        <Text style={{ fontSize: 16, fontWeight: '500' }}>
          View all friends
        </Text>
      </TouchableOpacity>
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
    justifyContent: 'space-between',
  },
  friendItem: {
    width: (SCREEN_WIDTH - 30 - 20) / 3,
    marginBottom: 15,
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
  },
});