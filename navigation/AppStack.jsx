import React from 'react';
import ExploreScreen from '../pages/App/Explore';
// import { TabNavigator } from './TabNavigator';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../pages/App/Home';
import AddPostScreen from '../pages/App/AddPost';

const RootStack = createNativeStackNavigator();

const AppStack = () => {
  return (
    <RootStack.Navigator initialRouteName="Home">
      {/* <RootStack.Screen
        name="TabNavigator"
        component={TabNavigator}
        options={{ headerShown: false }}
      /> */}
      <RootStack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <RootStack.Screen
        name="AddPost"
        component={AddPostScreen}
        options={{ headerShown: false }}
      />
      <RootStack.Screen name="Explore" component={ExploreScreen} />
    </RootStack.Navigator>
  );
};

export default AppStack;
