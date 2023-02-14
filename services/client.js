import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const client = axios.create({
  // baseURL: 'https://fbcloneapi.onrender.com/api/v1/',
  // baseURL: 'http://192.168.1.13:8000/api/v1/',
  baseURL: 'http://172.16.1.70:8000/api/v1/',
});

client.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('accessToken');
    config.headers.authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error),
);

export const defaultClient = axios.create({
  baseURL: '',
  withCredentials: false,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
  },
});

export default client;
