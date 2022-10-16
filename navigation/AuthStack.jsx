import AsyncStorage from '@react-native-async-storage/async-storage';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import LoginScreen from '../pages/Auth/Login';
import RegisterScreen from '../pages/Auth/Register';
import OnboardingScreen from '../pages/Onboarding';

const RootStack = createNativeStackNavigator();

const AuthStack = () => {
  const [isFirstLaunch, setIsFirstLaunch] = useState(null);

  useEffect(() => {
    AsyncStorage.getItem('alreadyLaunched')
      .then((value) => {
        if (value === null) {
          AsyncStorage.setItem('alreadyLaunched', 'true');
          setIsFirstLaunch(true);
        } else {
          setIsFirstLaunch(false);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  if (isFirstLaunch === null) return null;

  return (
    <RootStack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="Onboarding"
    >
      {isFirstLaunch && (
        <RootStack.Screen name="Onboarding" component={OnboardingScreen} />
      )}
      <RootStack.Screen name="Login" component={LoginScreen} />
      <RootStack.Screen name="Register" component={RegisterScreen} />
    </RootStack.Navigator>
  );
};

export default AuthStack;
