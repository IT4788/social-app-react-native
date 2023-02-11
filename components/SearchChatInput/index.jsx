import React from 'react';
import { View, StyleSheet, TextInput } from 'react-native';

import Icon from '@expo/vector-icons/FontAwesome';

const SearchChatInput = () => {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Icon name="search" size={20} color={'#999'} />
        <TextInput style={styles.input} placeholder="Search" maxLength={10} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    paddingHorizontal: 30,
  },
  row: {
    backgroundColor: '#f0f0f0',
    flexDirection: 'row',
    borderRadius: 5,
    height: 45,
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  input: {
    paddingHorizontal: 30,
    fontSize: 15,
    height: 45,
    flex: 1,
    color: '#444',
  },
});

export default SearchChatInput;
