import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import ExTouchableOpacity from '../../../components/ExTouchableOpacity';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import AppText from '../../../components/AppText';
import { SCREEN_WIDTH, STATUSBAR_HEIGHT } from '../../../constants';
import * as navigation from '../../../navigation/helpers';
import { useAuthContext } from '../../../context/AuthContext';
import RequestingFriendItem from './RequestingFriendItem';
import { getRequestingFriend } from '../../../services/friend';

// const mockFriends = Array(10)
//   .fill(1)
//   .map(() => ({
//     name: 'Dao Cam Tu',
//     avatar_url: 'https://randomuser.me/api/portraits/women/79.jpg',
//   }));

const ITEMS_PER_PAGE = 12;

const RequestingFriendsScreen = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [requestingFriends, setRequestingFriends] = useState([]);

  const [totalCancelled, setTotalCancelled] = useState(0);

  function onPressGoBackHandler() {
    navigation.goBack();
  }
  const { user } = useAuthContext();

  useEffect(() => {
    if (!user?._id) return;

    getRequestingFriend({ numberPage: 1 }).then((data) => {
      setTotalPage(
        Math.ceil(data.data?.data.pagination.total / ITEMS_PER_PAGE),
      );
      setRequestingFriends(data.data?.data?.friendRequesteds || []);
    });
  }, [user?._id]);

  const hasMore = currentPage < totalPage;

  async function loadMoreItems() {
    if (!hasMore) return;

    getRequestingFriend({
      numberPage: currentPage + 1,
    }).then((data) => {
      console.log('Get suggested friends success: ', data);
      setTotalPage(
        Math.ceil(Number(data.data?.data.pagination.total) / ITEMS_PER_PAGE),
      );
      setRequestingFriends((prev) =>
        prev.concat(data.data?.data?.friendRequesteds || []),
      );
      setCurrentPage(Number(data.data?.data?.pagination?.page));
    });
  }

  return (
    <View style={styles.container}>
      <FlatList
        ListHeaderComponent={() => (
          <View style={{ flex: 1 }}>
            <View style={styles.navigationBar}>
              <ExTouchableOpacity
                onPress={onPressGoBackHandler}
                style={styles.btnBack}
              >
                <FontAwesome5Icon name="arrow-left" color="#000" size={20} />
              </ExTouchableOpacity>
              <ExTouchableOpacity
                // onPress={onPressSearchHandler}
                style={styles.btnBack}
              >
                <FontAwesome5Icon name="search" color="#000" size={20} />
              </ExTouchableOpacity>
            </View>
            <View style={styles.searchToolWrapper}>
              <AppText style={styles.title}>
                {requestingFriends.length - totalCancelled}{' '}
                {requestingFriends.length - totalCancelled > 1
                  ? 'requests have'
                  : 'request has'}{' '}
                been sent
              </AppText>
            </View>
            {/* <AppText style={styles.friendsCount}>
              {requestingFriends.length} Friends
            </AppText> */}
          </View>
        )}
        data={requestingFriends}
        contentContainerStyle={{
          padding: 15,
          paddingTop: 0,
          width: SCREEN_WIDTH,
        }}
        keyExtractor={(item) => item._id}
        renderItem={({ item: friend }) => (
          <RequestingFriendItem
            friend={friend}
            onDecreaseTotal={() => setTotalCancelled((prev) => prev + 1)}
          />
        )}
        onEndReached={loadMoreItems}
      />
    </View>
  );
};

export default RequestingFriendsScreen;

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
});
