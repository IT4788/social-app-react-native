import React from 'react';
import HomeScreen from '../pages/App/Home';
import ProfileScreen from '../pages/App/Profile';
import NotificationScreen from '../pages/App/Notification';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AboutScreen from '../pages/App/About';

const Tab = createMaterialBottomTabNavigator();

const HomeStack = createNativeStackNavigator();
const ProfileStack = createNativeStackNavigator();
const NotificationStack = createNativeStackNavigator();

const HomeStackScreen = () => (
  <HomeStack.Navigator>
    <HomeStack.Screen name="Home" component={HomeScreen} />
    <HomeStack.Screen name="About" component={AboutScreen} />
  </HomeStack.Navigator>
);

const ProfileStackScreen = () => (
  <ProfileStack.Navigator>
    <ProfileStack.Screen name="Profile" component={ProfileScreen} />
  </ProfileStack.Navigator>
);

const NotificationStackScreen = () => (
  <NotificationStack.Navigator>
    <NotificationStack.Screen
      name="Notification"
      component={NotificationScreen}
    />
  </NotificationStack.Navigator>
);

export const TabNavigator = () => {
  return (
    <Tab.Navigator shifting initialRouteName="Home" activeColor="#fff">
      <Tab.Screen
        name="HomeStack"
        component={HomeStackScreen}
        options={{
          tabBarColor: '#009387',
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="ProfileStack"
        component={ProfileStackScreen}
        options={{
          tabBarColor: '#d02860',
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="account" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="NotificationStack"
        component={NotificationStackScreen}
        options={{
          tabBarColor: '#694fad',
          tabBarLabel: 'Notification',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="bell" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
