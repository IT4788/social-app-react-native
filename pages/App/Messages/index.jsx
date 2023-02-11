import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View } from 'react-native';
import ChatHeader from '../../../components/ChatHeader';
import ChatInput from '../../../components/ChatInput';
import MessageList from '../../../components/MessageList';

const MessagesScreen = () => {
  const navigation = useNavigation();
  // const route = useRoute()
  // const { username, bio, isBlocked, avatar, isMuted } =
  return (
    <View style={{ flex: 1 }}>
      <ChatHeader
        onPress={() => {
          navigation.goBack();
        }}
        username={'Nguyen Van An'}
        picture={''}
        onlineStatus={'online'}
      />
      <MessageList />
      <ChatInput />
    </View>
  );
};

export default MessagesScreen;
