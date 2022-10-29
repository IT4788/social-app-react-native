import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppStack from './AppStack';
import AuthStack from './AuthStack';
import { useAuthContext } from '../context/AuthContext';

const AppRoutes = () => {
  const { user } = useAuthContext();

  return (
    <NavigationContainer>
      {user ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default AppRoutes;
