import React from 'react';
import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from 'react-native-paper';

const HomeScreen = ({ navigation }) => {
  return (
    <SafeAreaView>
      <View>
        <Text>Home Screen</Text>
        <Button
          onPress={() => {
            navigation.navigate('Explore');
          }}
        >
          Go to explore page
        </Button>
        <Button
          onPress={() => {
            navigation.navigate('About');
          }}
        >
          Go to about page
        </Button>
        <Button
          onPress={() => {
            navigation.navigate('ProfileStack', {
              screen: 'Profile',
            });
          }}
        >
          Go to profile page
        </Button>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
