import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Image, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ProfileInfo from '../ProfileInfo';
import AppText from '../AppText';

const ConversationItem = ({
  picture,
  username,
  bio,
  lastMessage,
  time,
  isBlocked,
  isMuted,
  notification,
  hasStory,
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();

  const showStoryCircle = () => {
    if (hasStory) {
      return {
        borderColor: '#00f',
        borderWidth: 2,
      };
    }
  };

  const showNotification = (type) => {
    if (notification && type === 'number') {
      return (
        <View style={styles.notificationCircle}>
          <AppText style={styles.notification}>{notification}</AppText>
        </View>
      );
    } else if (notification && type === 'imageCircle') {
      return {
        borderColor: '#1877f2',
      };
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.conversation}
        onPress={() => navigation.push('Messages')}
      >
        <TouchableOpacity
          onPress={() => setModalVisible((currentValue) => !currentValue)}
          style={[styles.imageContainer, showStoryCircle()]}
        >
          <Image style={styles.image} source={{ uri: picture }} />
        </TouchableOpacity>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <AppText numerOfLine={1} style={styles.username}>
              {username}
            </AppText>
            <AppText style={styles.time}>{time}</AppText>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <AppText style={styles.message}>{lastMessage}</AppText>
            {showNotification('number')}
          </View>
        </View>
      </TouchableOpacity>
      <Modal animationType="slide" transparent visible={modalVisible}>
        <ProfileInfo
          username={username}
          picture={picture}
          bio={bio}
          isBlocked={isBlocked}
          isMuted={isMuted}
          hide={() => setModalVisible(false)}
        />
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  conversation: {
    flexDirection: 'row',
    paddingBottom: 25,
    paddingRight: 20,
    paddingLeft: 10,
  },
  imageContainer: {
    marginRight: 15,
    borderRadius: 25,
    height: 50,
    width: 50,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  image: {
    height: 55,
    width: 55,
  },
  username: {
    fontSize: 18,
    color: '#000',
    width: 210,
  },
  message: {
    fontSize: 15,
    width: 240,
    color: '#555',
  },
  time: {
    fontSize: 13,
    color: '#555',
    fontWeight: '300',
  },
  notificationCircle: {
    backgroundColor: '#1877f2',
    borderRadius: 50,
    height: 20,
    width: 20,
    marginRight: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  notification: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 10,
  },
});

export default ConversationItem;
