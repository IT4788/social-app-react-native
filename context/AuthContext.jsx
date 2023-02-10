import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { useContext } from 'react';
import { createContext } from 'react';
import client from '../services/client';
import * as navigation from '../navigation/helpers';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isSplashLoading, setIsSplashLoading] = useState(false);

  const getUserInfo = async () => {
    try {
      setIsSplashLoading(true);
      const res = await client.get('user');
      console.log('Get user info success: ', res.data);
      setUser(res.data?.data?.user);
    } catch (error) {
      console.log(error);
      if (error.response.status === 401) {
        setUser(null);
        await AsyncStorage.removeItem('accessToken');
      }
    } finally {
      setIsSplashLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await client.patch('auth/sign_out');
      setUser(null);
      await AsyncStorage.removeItem('accessToken');
      navigation.replace('Login');
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, setUser, getUserInfo, isSplashLoading, handleLogout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
export default AuthProvider;
