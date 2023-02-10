import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const client = axios.create({
  // baseURL: 'https://fbcloneapi.onrender.com/api/v1/',
  baseURL: 'http://192.168.1.13:8000/api/v1/',
});

client.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('accessToken');
    config.headers.authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error),
);

export default client;
