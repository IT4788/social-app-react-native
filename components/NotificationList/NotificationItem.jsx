/* eslint-disable react/display-name */
import React from 'react';
import { ImageBackground, StyleSheet, View } from 'react-native';
import { SCREEN_WIDTH } from '../../constants';
import AppText from '../AppText';
import ExTouchableOpacity from '../ExTouchableOpacity';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import { getUserAvatar } from '../../utils/image';
import { useNavigation } from '@react-navigation/native';

const NotificationItem = ({ item }) => {
  const navigation = useNavigation();

  const onClickLink = () => {
    console.log({ item });
    switch (item.type) {
      case 'new_comment_on_post':
        navigation.push('PostDetail', { id: item.linkPost });
        break;
      case 'new_post_reaction':
        navigation.push('PostDetail', { id: item.linkPost });
        break;
      default:
        return;
    }
  };

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
        onPress={() => {
          onClickLink();
        }}
      >
        <ImageBackground
          imageStyle={{ borderRadius: 64 }}
          style={styles.avatar}
          source={{ uri: getUserAvatar(item.avatar) }}
        >
          <View
            style={{
              ...styles.notificationIcon,
              // backgroundColor: icon.bgColor,
            }}
          >
            {/* <FontAwesome5Icon
              name={icon.name}
              size={icon.size}
              color={icon.color}
            /> */}
          </View>
        </ImageBackground>
        <View style={styles.contentWrapper}>
          <AppText style={styles.pureTxt}>{item?.content}</AppText>
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
