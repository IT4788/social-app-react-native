import React from 'react';
import { Text, View } from 'react-native';
import { Button } from 'react-native-paper';

const AboutScreen = ({ navigation }) => {
  return (
    <View>
      <Text>About Screen</Text>
      <Button
        onPress={() => {
          navigation.navigate('Explore');
        }}
      >
        Go to explore page
      </Button>
      <Button
        onPress={() => {
          navigation.navigate('ProfileStack', { screen: 'Profile' });
        }}
      >
        Go to profile page
      </Button>
    </View>
  );
};

export default AboutScreen;
