import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { useContext } from 'react';
import { createContext } from 'react';
import client from '../services/client';

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
      if (error.response.status === 401) {
        setUser(null);
        await AsyncStorage.removeItem('accessToken');
      }
    } finally {
      setIsSplashLoading(false);
    }
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, setUser, getUserInfo, isSplashLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
export default AuthProvider;
