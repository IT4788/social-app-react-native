import React from 'react';
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from '@expo/vector-icons/FontAwesome';
import { getUserAvatar } from '../../utils/image';
import AppText from '../AppText';

const ChatHeader = ({ username, picture, onlineStatus, onPress }) => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={onPress}>
        <Icon name="angle-left" size={30} color="#fff" />
      </TouchableOpacity>
      <View style={styles.profileOptions}>
        <TouchableOpacity style={styles.profile}>
          <Image
            style={styles.image}
            source={{ uri: getUserAvatar(picture) }}
          />
          <View style={styles.usernameAndOnlineStatus}>
            <AppText style={styles.username}>{username}</AppText>
            <AppText style={styles.onlineStatus}>{onlineStatus}</AppText>
          </View>
        </TouchableOpacity>
        <View style={styles.options}>
          <TouchableOpacity
            onPress={() =>
              navigation.push('OnCallScreen', {
                username: username,
                picture: picture,
              })
            }
            style={{ paddingHorizontal: 5 }}
          >
            <Icon name="phone" size={30} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity style={{ paddingHorizontal: 20 }}>
            <Icon name="ellipsis-v" size={30} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#1877f2',
    paddingTop: 20,
    paddingBottom: 10,
  },
  backButton: {
    alignSelf: 'center',
    paddingHorizontal: 10,
  },
  profileOptions: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  profile: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#fff',
    flex: 4,
  },
  image: {
    height: 65,
    width: 65,
    borderRadius: 32.5,
  },
  usernameAndOnlineStatus: {
    flexDirection: 'column',
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  username: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  onlineStatus: {
    color: '#fff',
    fontSize: 16,
  },
  options: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
});

export default ChatHeader;
