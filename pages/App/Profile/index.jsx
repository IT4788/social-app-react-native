import React, { useEffect, useLayoutEffect, useState } from 'react';
// import { Button } from 'react-native-paper';
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  FlatList,
} from 'react-native';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
// import { useAuthContext } from '../../../context/AuthContext';
// import HightlightPhotos from '../../../components/HightlightPhotos';
import ToolBar from '../Home/components/ToolBar';
import FriendsShowing from '../../../components/FriendShowing';
import Post from '../../../components/Post';
import * as navigation from '../../../navigation/helpers';
import { useQuery } from '@tanstack/react-query';
// import { useRoute } from '@react-navigation/native';
import { getUserProfile, updateProfileInfo } from '../../../services/user';
import { useAuthContext } from '../../../context/AuthContext';
import { getCoverImage, getUserAvatar } from '../../../utils/image';
import { Ionicons } from '@expo/vector-icons';
import useUpload from '../../../hooks/useUpload';
import AppText from '../../../components/AppText';
import { getUserPosts } from '../../../services/post';
import { getUserFriends } from '../../../services/friend';

const SCREEN_WIDTH = Math.round(Dimensions.get('window').width);

const ITEMS_PER_PAGE = 4;

const ProfileScreen = () => {
  const { user: loggedInUser, refetchUser } = useAuthContext();
  const [coverImage, setCoverImage] = useState(null);
  const [avatarImage, setAvatarImage] = useState(null);
  const [userPosts, setUserPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [friendsData, setFriendsData] = useState({});
  const id = loggedInUser?._id;

  const { handleUploadFile, handleOpenImageLib } = useUpload();
  const { data } = useQuery(['user', 'profile', id], () => getUserProfile(id), {
    onSuccess(data) {
      console.log(data);
    },
    select: (data) => data.data,
    enabled: !!id,
  });

  useLayoutEffect(() => {
    if (!id) return;

    getUserPosts(id, { perPage: ITEMS_PER_PAGE, numberPage: 1 }).then(
      (data) => {
        setTotalPage(
          Math.ceil(data.data?.data.pagination.total / ITEMS_PER_PAGE),
        );
        setUserPosts(data.data?.data?.posts || []);
      },
    );
  }, [id]);

  const user = data?.data;

  useEffect(() => {
    if (!user) return;

    setAvatarImage(getUserAvatar(user));
    setCoverImage(getCoverImage(user));
  }, [user]);

  function onPressEditPublicInfoHandler() {
    // const user = { ...this.props.user };
    // const highlightPhotos = [...this.props.highlightPhotos];
    navigation.push('EditPublicInfo', {
      // userInfo: user,
      // highlightPhotos,
    });
  }

  async function handleUpdateProfile(data) {
    await updateProfileInfo(data);
    refetchUser();
  }

  async function handleSelectCoverImage() {
    const result = await handleOpenImageLib();

    if (result?.base64) {
      let base64Img = `data:image/jpg;base64,${result.base64}`;
      const uploadRes = await handleUploadFile(base64Img);
      setCoverImage(uploadRes);

      // call api to update user cover image
      uploadRes && (await handleUpdateProfile({ cover_image: uploadRes }));
    }
  }

  async function handleSelectAvatarImage() {
    const result = await handleOpenImageLib();

    if (result?.base64) {
      let base64Img = `data:image/jpg;base64,${result.base64}`;
      const uploadRes = await handleUploadFile(base64Img);
      setAvatarImage(uploadRes);

      // call api to update user avatar image
      uploadRes && (await handleUpdateProfile({ avatar: uploadRes }));
    }
  }

  const hasMore = currentPage < totalPage;
  async function handleLoadMorePost() {
    if (!hasMore) return;

    getUserPosts(id, {
      perPage: ITEMS_PER_PAGE,
      numberPage: currentPage + 1,
    }).then((data) => {
      setTotalPage(
        Math.ceil(Number(data.data?.data.pagination.total) / ITEMS_PER_PAGE),
      );
      setUserPosts((prev) => prev.concat(data.data?.data?.posts || []));
      setCurrentPage(Number(data.data?.data?.pagination?.page));
    });
  }

  // const { friendsData } = useQuery(
  //   ['user', 'friends', { numberPage: 1 }],
  //   () => getUserFriends(id),
  //   {
  //     select: (data) => data.data.data,
  //   },
  // );

  useEffect(() => {
    if (!id) return;

    getUserFriends(id)
      .then((data) => {
        setFriendsData(data.data.data);
      })
      .catch(console.log);
  }, [id]);

  return (
    <View style={styles.container}>
      <FlatList
        ListHeaderComponent={() => (
          <View style={{ flex: 1 }}>
            <View style={styles.infoWrapper}>
              <View style={styles.avatarCoverWrapper}>
                <TouchableOpacity activeOpacity={0.8}>
                  <Image
                    style={styles.cover}
                    source={{
                      uri: coverImage,
                    }}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.btnChangeCover}
                  onPress={handleSelectCoverImage}
                >
                  <FontAwesome5Icon size={18} name="camera" />
                </TouchableOpacity>
                <View style={styles.avatarWrapper}>
                  <TouchableOpacity
                    onPress={handleSelectAvatarImage}
                    activeOpacity={0.9}
                  >
                    <Image
                      style={styles.avatar}
                      source={{
                        uri: avatarImage,
                      }}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={handleSelectAvatarImage}
                    style={styles.btnChangeAvatar}
                  >
                    <FontAwesome5Icon size={18} name="camera" />
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.introWrapper}>
                <AppText style={styles.name}>{user?.username}</AppText>
                {user?.firstName && user?.lastName ? (
                  <AppText style={styles.subName}>
                    ({user.lastName} {user.firstName})
                  </AppText>
                ) : null}
                {user?.description && (
                  <AppText style={styles.introTxt}>
                    {user?.description}{' '}
                  </AppText>
                )}
                <View style={styles.introOptionsWrapper}>
                  <TouchableOpacity
                    activeOpacity={0.8}
                    style={styles.btnAddStory}
                  >
                    <FontAwesome5Icon
                      size={16}
                      color="#fff"
                      name="plus-circle"
                    />
                    <AppText
                      style={{
                        fontSize: 16,
                        fontWeight: '500',
                        color: '#fff',
                        marginLeft: 5,
                      }}
                    >
                      Add to your story
                    </AppText>
                  </TouchableOpacity>
                  <TouchableOpacity
                    // onPress={this.onPressProfileSettingHandler}
                    activeOpacity={0.8}
                    style={styles.btnOption}
                  >
                    <FontAwesome5Icon
                      size={20}
                      color="#000"
                      name="ellipsis-h"
                    />
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.introListWrapper}>
                {user?.worked_at && (
                  <View style={styles.introLine}>
                    <FontAwesome5Icon
                      size={20}
                      color="#333"
                      style={styles.introIcon}
                      name="briefcase"
                    />
                    <AppText style={styles.introLineText}>
                      Work at{' '}
                      <AppText style={styles.introHightLight}>
                        {user?.worked_at}
                      </AppText>
                    </AppText>
                  </View>
                )}
                {user?.studied_at && (
                  <View style={styles.introLine}>
                    <Ionicons
                      name="school"
                      size={20}
                      color="#333"
                      style={styles.introIcon}
                    />
                    <AppText style={styles.introLineText}>
                      Study at{' '}
                      <AppText style={styles.introHightLight}>
                        {user?.studied_at}
                      </AppText>
                    </AppText>
                  </View>
                )}

                {user?.current_address && (
                  <View style={styles.introLine}>
                    <FontAwesome5Icon
                      size={20}
                      color="#333"
                      style={styles.introIcon}
                      name="home"
                    />
                    <AppText style={styles.introLineText}>
                      Live in{' '}
                      <AppText style={styles.introHightLight}>
                        {user?.current_address}
                      </AppText>
                    </AppText>
                  </View>
                )}

                {user?.from_address && (
                  <View style={styles.introLine}>
                    <FontAwesome5Icon
                      size={20}
                      color="#333"
                      style={styles.introIcon}
                      name="map-marker-alt"
                    />
                    <AppText style={styles.introLineText}>
                      From{' '}
                      <AppText style={styles.introHightLight}>
                        {user?.from_address}
                      </AppText>
                    </AppText>
                  </View>
                )}
              </View>
              <View
                style={{
                  paddingVertical: 20,
                  borderBottomWidth: 0.5,
                  borderBottomColor: '#ddd',
                }}
              >
                <TouchableOpacity
                  onPress={onPressEditPublicInfoHandler}
                  activeOpacity={0.8}
                  style={styles.btnEditPublicDetail}
                >
                  <AppText
                    style={{
                      color: '#318bfb',
                      fontSize: 16,
                      fontWeight: '500',
                    }}
                  >
                    Edit public info
                  </AppText>
                </TouchableOpacity>
              </View>
              <FriendsShowing
                friends={friendsData?.friends || []}
                totalFriend={friendsData?.pagination?.total || 0}
                userId={user?._id}
              />
            </View>
            <View style={{ marginTop: 20 }}>
              <ToolBar />
            </View>
            <ScrollView
              alignItems="center"
              bounces={false}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              style={styles.navigationsWrapper}
            >
              <TouchableOpacity style={styles.navigation}>
                <FontAwesome5Icon
                  style={styles.navigationIcon}
                  color="#000"
                  size={20}
                  name="images"
                />
                <AppText style={{ fontSize: 16, fontWeight: '500' }}>
                  Images
                </AppText>
              </TouchableOpacity>
              <TouchableOpacity style={styles.navigation}>
                <FontAwesome5Icon
                  style={styles.navigationIcon}
                  color="#000"
                  size={20}
                  name="video"
                />
                <AppText style={{ fontSize: 16, fontWeight: '500' }}>
                  Videos
                </AppText>
              </TouchableOpacity>
              <TouchableOpacity style={styles.navigation}>
                <FontAwesome5Icon
                  style={styles.navigationIcon}
                  color="#000"
                  size={20}
                  name="calendar-week"
                />
                <AppText style={{ fontSize: 16, fontWeight: '500' }}>
                  Life event
                </AppText>
              </TouchableOpacity>
              <TouchableOpacity
                style={{ ...styles.navigation, ...styles.lastNavigation }}
              >
                <FontAwesome5Icon
                  style={styles.navigationIcon}
                  color="#000"
                  size={20}
                  name="music"
                />
                <AppText style={{ fontSize: 16, fontWeight: '500' }}>
                  Music
                </AppText>
              </TouchableOpacity>
            </ScrollView>
          </View>
        )}
        data={userPosts}
        renderItem={(item) => <Post post={item.item} />}
        keyExtractor={(item) => item._id}
        ListFooterComponent={null}
        onEndReached={handleLoadMorePost}
      />
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {},
  infoWrapper: {
    padding: 15,
    backgroundColor: '#fff',
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
  },
  avatarCoverWrapper: {
    paddingBottom: 90,
    position: 'relative',
  },
  cover: {
    width: '100%',
    height: 200,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  avatarWrapper: {
    backgroundColor: '#000',
    position: 'absolute',
    borderRadius: 2000,
    left: (SCREEN_WIDTH - 30 - 180) / 2, //paddingHorizontal - avatarWidth
    bottom: 0,
  },
  avatar: {
    height: 180,
    width: 180,
    borderRadius: 2000,
    borderColor: '#fff',
    borderWidth: 5,
  },
  btnChangeCover: {
    backgroundColor: '#fff',
    position: 'absolute',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 2.5,
    bottom: 90 + 10,
    right: 10,
  },
  btnChangeAvatar: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    borderRadius: 50,
    width: 45,
    height: 45,
    borderWidth: 2.5,
    borderColor: '#fff',
    backgroundColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
  },
  introWrapper: {
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomColor: '#ddd',
    borderBottomWidth: 0.5,
  },
  name: {
    fontSize: 24,
    fontWeight: '500',
  },
  subName: {
    fontSize: 20,
    fontWeight: '500',
  },
  introTxt: {
    color: 'rgba(0,0,0,0.7)',
    marginTop: 10,
  },
  introOptionsWrapper: {
    marginTop: 15,
    flexDirection: 'row',
  },
  btnAddStory: {
    backgroundColor: '#318bfb',
    borderRadius: 5,
    height: 40,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: SCREEN_WIDTH - 30 - 50 - 10, //paddingHorizontal optionBtnWidth, marginLeft
  },
  btnOption: {
    marginLeft: 10,
    borderRadius: 5,
    height: 40,
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ddd',
  },
  introListWrapper: {
    paddingVertical: 10,
  },
  introLine: {
    flexDirection: 'row',
    height: 40,
    alignItems: 'center',
  },
  introIcon: {
    width: 30,
  },
  introLineText: {
    fontSize: 16,
    fontWeight: '400',
  },
  introHightLight: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  highlightPhotosWrapper: {
    flexDirection: 'row',
    borderRadius: 10,
    flexWrap: 'wrap',
    overflow: 'hidden',
    justifyContent: 'space-between',
  },
  highLightPhoto: {},
  photo: {
    width: (SCREEN_WIDTH - 42) / 3,
    height: (SCREEN_WIDTH - 42) / 3,
  },
  btnEditPublicDetail: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9dd0eb',
    width: '100%',
    height: 40,
    borderRadius: 5,
  },
  friendsWrapper: {
    paddingVertical: 15,
  },
  friendsBar: {
    borderRadius: 5,
    paddingVertical: 10,
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  btnFindFriends: {
    paddingHorizontal: 10,
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
  navigationsWrapper: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    marginTop: 15,
    borderTopColor: '#ddd',
    borderTopWidth: 1,
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
    height: 100,
    width: SCREEN_WIDTH,
    paddingHorizontal: 10,
  },
  navigation: {
    flexDirection: 'row',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 15,
    backgroundColor: '#ddd',
    borderRadius: 48,
    marginHorizontal: 5,
  },
  lastNavigation: {
    marginRight: 25,
  },
  navigationIcon: {
    width: 30,
    alignItems: 'center',
  },
});
