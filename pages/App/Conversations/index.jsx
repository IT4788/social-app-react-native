import React from 'react';
import { View } from 'react-native';
// import Icon from '@expo/vector-icons/MaterialIcons';
import SearchChatInput from '../../../components/SearchChatInput';
import Conversations from '../../../components/Conversations';

const ConversationsScreen = () => {
  return (
    <View style={{ backgroundColor: '#fff', flex: 1 }}>
      <Conversations>
        <SearchChatInput />
      </Conversations>
    </View>
  );
};

export default ConversationsScreen;
