import React from 'react';
import ExploreScreen from '../pages/App/Explore';
// import { TabNavigator } from './TabNavigator';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../pages/App/Home';
import AddPostScreen from '../pages/App/AddPost';
import PostDetailScreen from '../pages/App/PostDetail';
import CommentsScreen from '../pages/App/Comments';
import ProfileScreen from '../pages/App/Profile';
import ProfileXScreen from '../pages/App/ProfileX';
import EditPublicInfo from '../pages/App/EditPublicInfo';
import FullFriendsScreen from '../pages/App/FullFriends';
import NotificationScreen from '../pages/App/Notifications';
import { TabNavigator } from './TabNavigator';
import MyPageScreen from '../pages/App/MyPage';
import ChangePasswordScreen from '../pages/App/ChangePassword';
import MessagesScreen from '../pages/App/Messages';
import ConversationsScreen from '../pages/App/Conversations';
import SuggestedFriendsScreen from '../pages/App/SuggestedFriends';
import RequestingFriendsScreen from '../pages/App/RequestingFriends';
import RequestedFriendsScreen from '../pages/App/RequestedFriends';

const RootStack = createNativeStackNavigator();

const AppStack = () => {
  return (
    <RootStack.Navigator initialRouteName="Home">
      <RootStack.Screen
        name="TabNavigator"
        component={TabNavigator}
        options={{ headerShown: false }}
      />
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
      <RootStack.Screen
        name="PostDetail"
        component={PostDetailScreen}
        options={{ headerShown: false }}
      />
      <RootStack.Screen
        name="Comments"
        component={CommentsScreen}
        options={{ headerShown: false }}
      />
      <RootStack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ headerShown: false }}
      />
      <RootStack.Screen
        name="ProfileX"
        component={ProfileXScreen}
        options={{ headerShown: false }}
      />
      <RootStack.Screen
        name="EditPublicInfo"
        component={EditPublicInfo}
        options={{ headerShown: false }}
      />
      <RootStack.Screen
        name="FullFriends"
        component={FullFriendsScreen}
        options={{ headerShown: false }}
      />
      <RootStack.Screen
        name="Notifications"
        component={NotificationScreen}
        options={{ headerShown: false }}
      />
      <RootStack.Screen
        name="MyPage"
        component={MyPageScreen}
        options={{ headerShown: false }}
      />
      <RootStack.Screen
        name="ChangePassword"
        component={ChangePasswordScreen}
        options={{ headerShown: false }}
      />
      <RootStack.Screen
        name="Messages"
        component={MessagesScreen}
        options={{ headerShown: false }}
      />
      <RootStack.Screen
        name="Conversations"
        component={ConversationsScreen}
        options={{ headerShown: false }}
      />
      <RootStack.Screen
        name="SuggestedFriends"
        component={SuggestedFriendsScreen}
        options={{ headerShown: false }}
      />
      <RootStack.Screen
        name="RequestingFriends"
        component={RequestingFriendsScreen}
        options={{ headerShown: false }}
      />
      <RootStack.Screen
        name="RequestedFriends"
        component={RequestedFriendsScreen}
        options={{ headerShown: false }}
      />
      <RootStack.Screen name="Explore" component={ExploreScreen} />
    </RootStack.Navigator>
  );
};

export default AppStack;
