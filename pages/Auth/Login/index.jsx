import { ImageBackground, ScrollView } from 'react-native';
import React, { useState } from 'react';
import { TextInput } from 'react-native-paper';
import AppInput from '../../../components/AppInput';
import { FormContainer, FormGroup, StretchContainer } from './styles';
import AppButton from '../../../components/AppButton';
import { AdaptiveContainer } from '../../../components/common';
import { useAuthContext } from '../../../context/AuthContext';
import client from '../../../services/client';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import { getDeviceId } from 'react-native-device-info';

const LoginScreen = ({ navigation }) => {
  // const deviceId = getDeviceId();
  const { getUserInfo } = useAuthContext();
  const [loginData, setLoginData] = useState({
    phone: '',
    password: '',
  });

  const handleChange = (name, value) => {
    setLoginData({ ...loginData, [name]: value });
  };

  const handleLogin = async () => {
    try {
      const data = Object.assign(loginData, { deviceId: '1242#CDSA' });
      const { data: loginRes } = await client.patch('auth/sign_in', data);
      await AsyncStorage.setItem('accessToken', loginRes.data.accessToken);

      console.log({ loginRes });

      await getUserInfo();
      // navigation.replace('Home');
      // navigateToLoginScreen();
    } catch (error) {
      console.log(error);
    }
  };

  const navigateToRegisterScreen = () => {
    navigation.navigate('Register');
  };

  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
      }}
    >
      <ImageBackground
        source={{
          uri: 'https://images.unsplash.com/photo-1562577309-4932fdd64cd1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80',
        }}
        style={{ height: 200 }}
        resizeMode="cover"
      />
      <FormContainer>
        <StretchContainer style={{ marginBottom: 40 }}>
          <FormGroup>
            <AppInput
              placeholder="Email or phone"
              left={<TextInput.Icon icon="email-outline" />}
              value={loginData.phone}
              onChangeText={(text) => handleChange('phone', text)}
            />
          </FormGroup>
          <FormGroup>
            <AppInput
              left={<TextInput.Icon icon="lock-outline" />}
              placeholder="Password"
              secureTextEntry
              value={loginData.password}
              onChangeText={(text) => handleChange('password', text)}
            />
          </FormGroup>
          <AppButton onPress={handleLogin}>LOGIN</AppButton>
          <AdaptiveContainer>
            <AppButton mode="text" style={{ marginTop: 10 }}>
              Forgot Password?
            </AppButton>
          </AdaptiveContainer>
        </StretchContainer>
        <AdaptiveContainer>
          <AppButton mode="outlined" onPress={navigateToRegisterScreen}>
            CREATE NEXT SOCIAL ACCOUNT
          </AppButton>
        </AdaptiveContainer>
      </FormContainer>
    </ScrollView>
  );
};

export default LoginScreen;
