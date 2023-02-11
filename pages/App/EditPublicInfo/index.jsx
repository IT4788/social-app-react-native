import React, { useEffect, useRef } from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import ExTouchableOpacity from '../../../components/ExTouchableOpacity';
import AppText from '../../../components/AppText';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import { FontAwesome } from '@expo/vector-icons';
// import HightlightPhotos from '../../../components/HightlightPhotos';
import { SCREEN_HEIGHT, STATUSBAR_HEIGHT } from '../../../constants';
import * as navigation from '../../../navigation/helpers';
import AppInput from '../../../components/AppInput';
import { Controller, useForm } from 'react-hook-form';
import { useAuthContext } from '../../../context/AuthContext';
import { useMutation, useQuery } from '@tanstack/react-query';
import { getUserProfile, updateProfileInfo } from '../../../services/user';
import { getCoverImage, getUserAvatar } from '../../../utils/image';
import useUpload from '../../../hooks/useUpload';
import { Ionicons } from '@expo/vector-icons';

const defaultProfileValues = {
  avatar: '',
  cover_image: '',
  username: '',
  firstName: '',
  lastName: '',
  description: '',
  current_address: '',
  from_address: '',
  worked_at: '',
  studied_at: '',
};

const EditPublicInfo = () => {
  const { user: loggedInUser, refetchUser } = useAuthContext();
  const id = loggedInUser?._id;
  const scrollViewRef = useRef();
  const { handleUploadFile, handleOpenImageLib } = useUpload();

  const { data, refetch: fetchUser } = useQuery(
    ['user', 'profile', id],
    () => getUserProfile(id),
    {
      onSuccess(data) {
        console.log(data);
      },
      select: (data) => data.data,
      enabled: false,
    },
  );
  const user = data?.data;

  const onPressGoBackHandler = () => {
    navigation.goBack();
  };

  const { control, setValue, watch, reset, getValues } = useForm({
    defaultValues: defaultProfileValues,
  });

  useEffect(() => {
    if (id) {
      fetchUser();
    }
  }, [id]);

  useEffect(() => {
    if (!user) return;
    console.log({ user });
    reset({
      avatar: user.avatar || '',
      cover_image: user.cover_image || '',
      username: user.username || '',
      firstName: user.firstName || '',
      lastName: user.lastName || '',
      description: user.description || '',
      current_address: user.current_address || '',
      from_address: user.from_address || '',
      worked_at: user.worked_at || '',
      studied_at: user.studied_at || '',
    });
  }, [user]);

  const avatar = watch('avatar');
  const coverImage = watch('cover_image');

  const { mutate } = useMutation(updateProfileInfo, {
    onSuccess() {
      refetchUser();
      navigation.push('Profile');
    },
  });

  const handleSaveProfileInfo = () => {
    const data = getValues();

    mutate(data);
  };

  async function handleSelectCoverImage() {
    const result = await handleOpenImageLib();

    if (result?.base64) {
      let base64Img = `data:image/jpg;base64,${result.base64}`;
      const uploadRes = await handleUploadFile(base64Img);

      uploadRes && setValue('cover_image', uploadRes);
    }
  }

  async function handleSelectAvatarImage() {
    const result = await handleOpenImageLib();

    if (result?.base64) {
      let base64Img = `data:image/jpg;base64,${result.base64}`;
      const uploadRes = await handleUploadFile(base64Img);

      uploadRes && setValue('avatar', uploadRes);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.navigationBar}>
        <ExTouchableOpacity
          onPress={onPressGoBackHandler}
          style={styles.btnBack}
        >
          <FontAwesome5Icon name="arrow-left" color="#000" size={20} />
        </ExTouchableOpacity>
        <AppText style={styles.navigationTitle}>Edit your profile</AppText>
      </View>
      <ScrollView
        ref={scrollViewRef}
        bounces={false}
        style={styles.detailsWrapper}
      >
        <View style={{ ...styles.detail, paddingTop: 0 }}>
          <View style={styles.detailTitleWrapper}>
            <AppText style={styles.detailTitle}>Avatar</AppText>
            <TouchableOpacity onPress={handleSelectAvatarImage}>
              <AppText style={{ fontSize: 16, color: '#318bfb' }}>
                Modify
              </AppText>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            onPress={handleSelectAvatarImage}
            activeOpacity={0.8}
          >
            <Image
              source={{ uri: getUserAvatar(avatar) }}
              style={styles.avatar}
            ></Image>
          </TouchableOpacity>
        </View>
        <View style={styles.detail}>
          <View style={styles.detailTitleWrapper}>
            <AppText style={styles.detailTitle}>Cover</AppText>
            <TouchableOpacity onPress={handleSelectCoverImage}>
              <AppText style={{ fontSize: 16, color: '#318bfb' }}>
                Modify
              </AppText>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={handleSelectCoverImage}
          >
            <Image
              source={{ uri: getCoverImage(coverImage) }}
              style={styles.cover}
            ></Image>
          </TouchableOpacity>
        </View>
        <View style={styles.detail}>
          <View style={styles.detailTitleWrapper}>
            <AppText style={styles.detailTitle}>Introduction</AppText>
          </View>
          <TouchableOpacity activeOpacity={0.8}>
            {/* <AppText style={styles.introTxt}>{userInfo.introTxt}</AppText> */}
            <Controller
              control={control}
              name="description"
              render={({ field: { value, onChange } }) => (
                <AppInput
                  // left={<TextInput.Icon icon="lock-outline" />}
                  placeholder="Your introduction"
                  value={value}
                  onChangeText={(text) => onChange({ target: { value: text } })}
                />
              )}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.detail}>
          <View style={styles.detailTitleWrapper}>
            <AppText style={styles.detailTitle}>Details</AppText>
            {/* <TouchableOpacity>
              <AppText style={{ fontSize: 16, color: '#318bfb' }}>
                Modify
              </AppText>
            </TouchableOpacity> */}
          </View>
          <View style={styles.introListWrapper}>
            <View style={styles.introLine}>
              <View style={{ flexDirection: 'row' }}>
                <FontAwesome
                  style={styles.introIcon}
                  name="user"
                  size={20}
                  color="#333"
                />
                <AppText style={styles.introLineText}>Username </AppText>
              </View>
              <Controller
                control={control}
                name="username"
                render={({ field: { value, onChange } }) => (
                  <AppInput
                    placeholder="Username"
                    value={value}
                    onChangeText={(text) =>
                      onChange({ target: { value: text } })
                    }
                  />
                )}
              />
            </View>

            <View style={styles.introLine}>
              <View style={{ flexDirection: 'row' }}>
                <FontAwesome5Icon
                  size={20}
                  color="#333"
                  style={styles.introIcon}
                  name="briefcase"
                />
                <AppText style={styles.introLineText}>Work at </AppText>
              </View>
              <Controller
                control={control}
                name="worked_at"
                render={({ field: { value, onChange } }) => (
                  <AppInput
                    placeholder="Work at"
                    value={value}
                    onChangeText={(text) =>
                      onChange({ target: { value: text } })
                    }
                  />
                )}
              />
            </View>
            <View style={styles.introLine}>
              <View style={{ flexDirection: 'row' }}>
                <Ionicons
                  name="school"
                  size={20}
                  color="#333"
                  style={styles.introIcon}
                />
                <AppText style={styles.introLineText}>Study at </AppText>
              </View>
              <Controller
                control={control}
                name="studied_at"
                render={({ field: { value, onChange } }) => (
                  <AppInput
                    placeholder="Study at"
                    value={value}
                    onChangeText={(text) =>
                      onChange({ target: { value: text } })
                    }
                  />
                )}
              />
            </View>
            <View style={styles.introLine}>
              <View style={{ flexDirection: 'row' }}>
                <FontAwesome5Icon
                  size={20}
                  color="#333"
                  style={styles.introIcon}
                  name="home"
                />
                <AppText style={styles.introLineText}>Live in </AppText>
              </View>
              <Controller
                control={control}
                name="current_address"
                render={({ field: { value, onChange } }) => (
                  <AppInput
                    placeholder="Live in"
                    value={value}
                    onChangeText={(text) =>
                      onChange({ target: { value: text } })
                    }
                  />
                )}
              />
            </View>
            <View style={styles.introLine}>
              <View style={{ flexDirection: 'row' }}>
                <FontAwesome5Icon
                  size={20}
                  color="#333"
                  style={styles.introIcon}
                  name="map-marker-alt"
                />
                <AppText style={styles.introLineText}>From </AppText>
              </View>
              <Controller
                control={control}
                name="from_address"
                render={({ field: { value, onChange } }) => (
                  <AppInput
                    placeholder="From"
                    value={value}
                    onChangeText={(text) =>
                      onChange({ target: { value: text } })
                    }
                  />
                )}
              />
            </View>
            {/* <View style={styles.introLine}>
              <FontAwesome5Icon
                size={20}
                color="#333"
                style={styles.introIcon}
                name="heart"
              />
              <AppText style={styles.introLineText}>
                Relationship{' '}
                <AppText style={styles.introHightLight}>
                  {userInfo.relationship}
                </AppText>
              </AppText>
            </View>
            <View style={styles.introLine}>
              <FontAwesome5Icon
                size={20}
                color="#333"
                style={styles.introIcon}
                name="rss"
              />
              <AppText style={styles.introLineText}>
                Followed by{' '}
                <AppText style={styles.introHightLight}>
                  {userInfo.follower}{' '}
                </AppText>
                followers
              </AppText>
            </View>
            <View style={styles.introLine}>
              <FontAwesome5Icon
                size={20}
                color="#333"
                style={styles.introIcon}
                name="github"
              />
              <TouchableOpacity>
                <AppText style={styles.introLineText}>
                  {userInfo.links.github}
                </AppText>
              </TouchableOpacity>
            </View>
            <View style={styles.introLine}>
              <FontAwesome5Icon
                size={20}
                color="#333"
                style={styles.introIcon}
                name="link"
              />
              <TouchableOpacity>
                <AppText style={styles.introLineText}>
                  {userInfo.links.repl}
                </AppText>
              </TouchableOpacity>
            </View>
            <View style={styles.introLine}>
              <FontAwesome5Icon
                size={20}
                color="#333"
                style={styles.introIcon}
                name="ellipsis-h"
              />
              <TouchableOpacity>
                <AppText style={styles.introLineText}>
                  View more introductory information
                </AppText>
              </TouchableOpacity>
            </View> */}
          </View>
        </View>
        {/* <View style={styles.detail}>
          <View style={styles.detailTitleWrapper}>
            <AppText style={styles.detailTitle}>Hobbies</AppText>
            <TouchableOpacity>
              <AppText style={{ fontSize: 16, color: '#318bfb' }}>Add</AppText>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ ...styles.detail }}>
          <View style={styles.detailTitleWrapper}>
            <AppText style={styles.detailTitle}>HighLight Photos</AppText>
            <TouchableOpacity>
              <AppText style={{ fontSize: 16, color: '#318bfb' }}>
                Modify
              </AppText>
            </TouchableOpacity>
          </View>
          <TouchableOpacity activeOpacity={0.9} style={styles.highlightGallery}>
            <HightlightPhotos
              isFullRadius={true}
              photos={[
                {
                  photo_url:
                    'https://images.unsplash.com/photo-1674231313303-ab9bd1196390?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0OXx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60',
                },
                {
                  photo_url:
                    'https://images.unsplash.com/photo-1674231313303-ab9bd1196390?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0OXx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60',
                },
                {
                  photo_url:
                    'https://images.unsplash.com/photo-1674231313303-ab9bd1196390?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0OXx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60',
                },
                {
                  photo_url:
                    'https://images.unsplash.com/photo-1674231313303-ab9bd1196390?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0OXx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60',
                },
                {
                  photo_url:
                    'https://images.unsplash.com/photo-1674231313303-ab9bd1196390?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0OXx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60',
                },
                {
                  photo_url:
                    'https://images.unsplash.com/photo-1674231313303-ab9bd1196390?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0OXx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60',
                },
              ]}
            />
          </TouchableOpacity>
        </View> */}
        <View
          activeOpacity={0.9}
          style={{ ...styles.detail, ...styles.lastDetail }}
        >
          <TouchableOpacity
            onPress={handleSaveProfileInfo}
            style={styles.btnModifyMore}
          >
            <FontAwesome5Icon />
            <AppText
              style={{ color: '#318bfb', fontSize: 16, fontWeight: '500' }}
            >
              Save Profile
            </AppText>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default EditPublicInfo;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  navigationBar: {
    paddingTop: STATUSBAR_HEIGHT,
    flexDirection: 'row',
    height: 94,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  btnBack: {
    width: 50,
    alignItems: 'center',
  },
  navigationTitle: {
    fontSize: 18,
  },
  detailsWrapper: {
    padding: 15,
    height: SCREEN_HEIGHT - (50 + STATUSBAR_HEIGHT),
  },
  detail: {
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
    paddingVertical: 15,
  },
  detailTitleWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  detailTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  avatar: {
    width: 140,
    height: 140,
    alignSelf: 'center',
    borderRadius: 140,
  },
  cover: {
    width: '100%',
    height: 200,
    marginVertical: 10,
    borderRadius: 10,
  },
  introTxt: {
    color: '#333',
    alignSelf: 'center',
    marginVertical: 10,
  },
  introListWrapper: {
    paddingVertical: 10,
  },
  introLine: {
    // flexDirection: 'row',
    // height: 40,
    // alignItems: 'center',
    marginBottom: 20,
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
  highlightGallery: {
    marginVertical: 10,
  },
  lastDetail: {
    marginBottom: 30,
    borderBottomWidth: 0,
  },
  btnModifyMore: {
    height: 40,
    width: '100%',
    backgroundColor: '#9dd0eb',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    borderRadius: 5,
  },
});
