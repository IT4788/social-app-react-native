import React, { useState } from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import ExTouchableOpacity from '../../../components/ExTouchableOpacity';
import AppText from '../../../components/AppText';
import * as navigation from '../../../navigation/helpers';
import { getUserAvatar } from '../../../utils/image';
import { SCREEN_WIDTH, STATUSBAR_HEIGHT } from '../../../constants';
import {
  cancelFriendRequest,
  createFriendRequest,
} from '../../../services/friend';

const SuggestFriendItem = ({ friend }) => {
  const [isSendRequest, setIsSendRequest] = useState(false);

  async function handleSendReq() {
    setIsSendRequest(true);
    await createFriendRequest(friend._id);
  }

  async function handleCancelReq() {
    setIsSendRequest(false);
    await cancelFriendRequest(friend._id);
  }

  return (
    <View>
      <ExTouchableOpacity
        onPress={() => {
          navigation.push('ProfileX', { id: friend._id });
        }}
        style={styles.friendItem}
      >
        <Image
          source={{ uri: getUserAvatar(friend) }}
          style={styles.friendAvatar}
        />
        <View style={styles.friendInfoWrapper}>
          <AppText style={styles.friendName}>{friend.username}</AppText>
          <AppText style={styles.friendMutualCount}>
            {friend.totalSameFriend} mutual friends
          </AppText>
          {!isSendRequest ? (
            <TouchableOpacity
              style={styles.addFriendBtn}
              onPress={handleSendReq}
            >
              <AppText style={styles.btnText}>Add friend</AppText>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.cancelReqBtn}
              onPress={handleCancelReq}
            >
              <AppText style={styles.btnCancelText}>Cancel request</AppText>
            </TouchableOpacity>
          )}
        </View>
      </ExTouchableOpacity>
    </View>
  );
};

export default SuggestFriendItem;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
  },
  navigationBar: {
    paddingTop: STATUSBAR_HEIGHT,
    flexDirection: 'row',
    height: 94,
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  btnBack: {
    // width: 50,
    alignItems: 'center',
  },
  navigationTitle: {
    fontSize: 18,
  },
  searchToolWrapper: {
    paddingVertical: 10,
    // paddingHorizontal: 15,
  },
  filterWrapper: {
    flexDirection: 'row',
  },
  btnFilter: {
    // paddingHorizontal: 15,
    backgroundColor: '#ddd', // '#9dd0eb'
    borderRadius: 50,
    height: 40,
    justifyContent: 'center',
  },
  btnFilterActived: {
    backgroundColor: '#9dd0eb', //
  },
  searchTool: {
    flexDirection: 'row',
    marginTop: 10,
    overflow: 'hidden',
    borderRadius: 50,
  },
  btnSearchIcon: {
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ddd',
    width: 40,
  },
  searchInput: {
    height: 40,
    width: SCREEN_WIDTH - 30 - 40, //paddingHorizontal btnSearch
    backgroundColor: '#ddd',
    paddingRight: 30,
  },
  friendsWrapper: {
    padding: 15,
    paddingTop: 0,
    width: SCREEN_WIDTH,
    // height: SCREEN_HEIGHT - (STATUSBAR_HEIGHT + 50) - 120, //navigation bar searchTool
  },
  friendsCount: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  friends: {},
  friendItem: {
    flexDirection: 'row',
    marginVertical: 10,
    alignItems: 'center',
  },
  friendAvatar: {
    height: 80,
    width: 80,
    borderRadius: 80,
    borderColor: '#333',
    borderWidth: 0.2,
  },
  friendInfoWrapper: {
    width: SCREEN_WIDTH - 30 - 80 - 30, //paddingHorizontal avatar optionBtn,
    paddingLeft: 15,
  },
  friendName: {
    fontSize: 16,
    fontWeight: '600',
  },
  friendMutualCount: {
    color: '#333',
  },
  btnFriendOptions: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
  },
  addFriendBtn: {
    backgroundColor: '#1877f2',
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    marginTop: 8,
  },
  btnText: {
    color: '#fff',
    fontWeight: '500',
    fontSize: 12,
  },
  cancelReqBtn: {
    backgroundColor: '#ccc',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    marginTop: 8,
  },
  btnCancelText: {
    fontWeight: '500',
    fontSize: 12,
    color: '#2c2c2c',
  },
});
