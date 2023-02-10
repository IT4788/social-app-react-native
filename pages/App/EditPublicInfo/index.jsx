import React from 'react';
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
import HightlightPhotos from '../../../components/HightlightPhotos';
import { SCREEN_HEIGHT, STATUSBAR_HEIGHT } from '../../../constants';
import * as navigation from '../../../navigation/helpers';

const EditPublicInfo = () => {
  const userInfo = {
    avatar_url:
      'https://images.unsplash.com/photo-1674413146454-41e62f015153?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw4MHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60',
    cover_url:
      'https://images.unsplash.com/photo-1674413146454-41e62f015153?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw4MHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60',
    introTxt: 'sdkcmsdkcmdksmckdsmcds',
    work_at: 'kdcndskcmdskmcdsc',
    live_in: 'dskcdskcmdksmckdsmcksdmcs',
    from: 'dkcndscskdmc',
    relationship: 'dkcnsdkcndskjcnd',
    follower: 40,
    links: {
      repl: 'skmcskmcskmcskmc',
      github: 'https://youtube.com',
    },
  };

  const onPressGoBackHandler = () => {
    navigation.goBack();
  };

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
      <ScrollView bounces={false} style={styles.detailsWrapper}>
        <View style={{ ...styles.detail, paddingTop: 0 }}>
          <View style={styles.detailTitleWrapper}>
            <AppText style={styles.detailTitle}>Avatar</AppText>
            <TouchableOpacity>
              <AppText style={{ fontSize: 16, color: '#318bfb' }}>
                Modify
              </AppText>
            </TouchableOpacity>
          </View>
          <TouchableOpacity activeOpacity={0.8}>
            <Image
              source={{ uri: userInfo.avatar_url }}
              style={styles.avatar}
            ></Image>
          </TouchableOpacity>
        </View>
        <View style={styles.detail}>
          <View style={styles.detailTitleWrapper}>
            <AppText style={styles.detailTitle}>Cover</AppText>
            <TouchableOpacity>
              <AppText style={{ fontSize: 16, color: '#318bfb' }}>
                Modify
              </AppText>
            </TouchableOpacity>
          </View>
          <TouchableOpacity activeOpacity={0.8}>
            <Image
              source={{ uri: userInfo.cover_url }}
              style={styles.cover}
            ></Image>
          </TouchableOpacity>
        </View>
        <View style={styles.detail}>
          <View style={styles.detailTitleWrapper}>
            <AppText style={styles.detailTitle}>Introduction</AppText>
            <TouchableOpacity>
              <AppText style={{ fontSize: 16, color: '#318bfb' }}>
                Modify
              </AppText>
            </TouchableOpacity>
          </View>
          <TouchableOpacity activeOpacity={0.8}>
            <AppText style={styles.introTxt}>{userInfo.introTxt}</AppText>
          </TouchableOpacity>
        </View>
        <View style={styles.detail}>
          <View style={styles.detailTitleWrapper}>
            <AppText style={styles.detailTitle}>Details</AppText>
            <TouchableOpacity>
              <AppText style={{ fontSize: 16, color: '#318bfb' }}>
                Modify
              </AppText>
            </TouchableOpacity>
          </View>
          <View style={styles.introListWrapper}>
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
                  {userInfo.work_at}
                </AppText>
              </AppText>
            </View>
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
                  {userInfo.live_in}
                </AppText>
              </AppText>
            </View>
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
                  {userInfo.from}
                </AppText>
              </AppText>
            </View>
            <View style={styles.introLine}>
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
            </View>
          </View>
        </View>
        <View style={styles.detail}>
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
        </View>
        <View
          activeOpacity={0.9}
          style={{ ...styles.detail, ...styles.lastDetail }}
        >
          <TouchableOpacity style={styles.btnModifyMore}>
            <FontAwesome5Icon />
            <AppText
              style={{ color: '#318bfb', fontSize: 16, fontWeight: '500' }}
            >
              Modify introduction informations
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
