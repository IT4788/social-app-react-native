import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppStack from './AppStack';
import AuthStack from './AuthStack';
import { useAuthContext } from '../context/AuthContext';
import SplashScreen from '../pages/SplashScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const AppRoutes = () => {
  const { user, isSplashLoading } = useAuthContext();

  return (
    <NavigationContainer>
      {isSplashLoading ? (
        <Stack.Screen
          component={SplashScreen}
          name="Spash"
          options={{ headerShown: false }}
        />
      ) : user ? (
        <AppStack />
      ) : (
        <AuthStack />
      )}
    </NavigationContainer>
  );
};

export default AppRoutes;
