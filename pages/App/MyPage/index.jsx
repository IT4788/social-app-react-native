import React from 'react';
import {
  // Animated,
  Image,
  ScrollView,
  StyleSheet,
  // TouchableOpacity,
  View,
} from 'react-native';
import AppText from '../../../components/AppText';
import ExTouchableOpacity from '../../../components/ExTouchableOpacity';
// import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
// import Avatar from '../../../components/Avatar';
import * as navigation from '../../../navigation/helpers';
// import styled from 'styled-components/native';
import { SCREEN_WIDTH } from '../../../constants';
import { useAuthContext } from '../../../context/AuthContext';
import { getUserAvatar } from '../../../utils/image';

// const User = styled.View`
//   margin-right: 22px;
// `;

const MyPageScreen = () => {
  const { user, handleLogout } = useAuthContext();

  const handleGoToChangePassword = () => {
    navigation.push('ChangePassword');
  };

  return (
    <View style={styles.container}>
      <ScrollView bounces={false}>
        <ExTouchableOpacity
          style={styles.btnProfile}
          onPress={() => navigation.push('Profile')}
        >
          <Image
            style={styles.avatar}
            source={{
              uri: getUserAvatar(user),
            }}
          />
          <View>
            <AppText style={styles.name}>{user?.username}</AppText>
            <AppText style={{ color: '#333' }}>View your profile page</AppText>
          </View>
        </ExTouchableOpacity>
        {/* <ExTouchableOpacity
          // onPress={this.onPressWatchVideoHandler}
          style={styles.btnOption}
        >
          <Image
            style={styles.icon}
            source={require('../../../assets/icons/video.png')}
          />
          <View>
            <AppText style={styles.name}>Video on facebook</AppText>
            <AppText style={{ color: '#333' }}>X+ new videos</AppText>
          </View>
        </ExTouchableOpacity> */}
        {/* <ExTouchableOpacity style={styles.btnOption}>
          <Image
            style={styles.icon}
            source={require('../../../assets/icons/bookmark.png')}
          />
          <View>
            <AppText style={styles.name}>Saved</AppText>
          </View>
        </ExTouchableOpacity> */}
        {/* <ExTouchableOpacity style={styles.btnOption}>
          <Image
            style={styles.icon}
            source={require('../../../assets/icons/live-news.png')}
          />
          <View>
            <AppText style={styles.name}>Live video</AppText>
          </View>
        </ExTouchableOpacity> */}
        <ExTouchableOpacity
          onPress={() => navigation.push('FullFriends', { id: user?._id })}
          style={styles.btnOption}
        >
          <Image
            style={styles.icon}
            source={require('../../../assets/icons/friendship.png')}
          />
          <View>
            <AppText style={styles.name}>Friends</AppText>
            {/* Danh sách bạn bè */}
          </View>
        </ExTouchableOpacity>
        <ExTouchableOpacity
          style={styles.btnOption}
          onPress={() => navigation.push('RequestedFriends')}
        >
          <Image
            style={styles.icon}
            source={require('../../../assets/icons/friendship.png')}
          />
          <View>
            <AppText style={styles.name}>Requested Friends</AppText>
            {/* Người khác gửi lời mời kết bạn với mình */}
          </View>
        </ExTouchableOpacity>

        <ExTouchableOpacity
          onPress={() => navigation.push('RequestingFriends')}
          style={styles.btnOption}
        >
          <Image
            style={styles.icon}
            source={require('../../../assets/icons/friendship.png')}
          />
          <View>
            <AppText style={styles.name}>Requesting Friends</AppText>
            {/* Mình đang gửi lời mời kết bạn */}
          </View>
        </ExTouchableOpacity>

        {/* <ExTouchableOpacity
          // onPress={this.onPressGroupsHandler}
          style={styles.btnOption}
        >
          <Image
            style={styles.icon}
            source={require('../../../assets/icons/group.png')}
          />
          <View>
            <AppText style={styles.name}>Groups</AppText>
          </View>
        </ExTouchableOpacity> */}
        {/* <ExTouchableOpacity
          // onPress={this.onPressMarketplaceHandler}
          style={styles.btnOption}
        >
          <Image
            style={styles.icon}
            source={require('../../../assets/icons/marketplace.png')}
          />
          <View>
            <AppText style={styles.name}>Marketplace</AppText>
          </View>
        </ExTouchableOpacity> */}
        <ExTouchableOpacity
          // onPress={this.onpressFriendAroundHandler}
          style={styles.btnOption}
          onPress={() => navigation.push('SuggestedFriends')}
        >
          <Image
            style={styles.icon}
            source={require('../../../assets/icons/planet.png')}
          />
          <View>
            <AppText style={styles.name}>Friends around here</AppText>
            {/* Danh sách bạn bè gợi ý */}
          </View>
        </ExTouchableOpacity>
        {/* <ExTouchableOpacity style={styles.btnOption}>
          <Image
            style={styles.icon}
            source={require('../../../assets/icons/question-mark.png')}
          />
          <View>
            <AppText style={styles.name}>Help & Support</AppText>
          </View>
        </ExTouchableOpacity> */}
        <ExTouchableOpacity
          onPress={handleGoToChangePassword}
          style={styles.btnOption}
        >
          <Image
            style={styles.icon}
            source={require('../../../assets/icons/gear.png')}
          />
          <View>
            <AppText style={styles.name}>Change Password</AppText>
          </View>
        </ExTouchableOpacity>
        <ExTouchableOpacity onPress={handleLogout} style={styles.btnOption}>
          <Image
            style={styles.icon}
            source={require('../../../assets/icons/logout.png')}
          />
          <View>
            <AppText style={styles.name}>Logout </AppText>
          </View>
        </ExTouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default MyPageScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  btnProfile: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    height: 70,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  btnOption: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    paddingHorizontal: 15,
  },
  avatar: {
    height: 42,
    width: 42,
    borderRadius: 32,
    marginRight: 10,
    borderColor: '#333',
    borderWidth: 0.2,
  },
  icon: {
    height: 24,
    resizeMode: 'contain',
    marginRight: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  centerBtnShowMore: {
    width: SCREEN_WIDTH - 100,
  },
});
