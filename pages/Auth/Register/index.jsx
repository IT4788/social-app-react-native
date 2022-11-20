import { ImageBackground, ScrollView } from 'react-native';
import React, { useState } from 'react';
import AppInput from '../../../components/AppInput';
import { FormContainer, FormGroup, StretchContainer } from './styles';
import AppButton from '../../../components/AppButton';
import { AdaptiveContainer } from '../../../components/common';
// import AppRadioGroup from '../../../components/AppRadioGroup';
import client from '../../../services/client';
// import { TextInput } from 'react-native-paper';

const RegisterScreen = ({ navigation }) => {
  const [registerData, setRegisterData] = useState({
    phone: '',
    username: '',
    password: '',
    passwordConfirmation: '',
  });

  const handleChange = (name, value) => {
    setRegisterData({ ...registerData, [name]: value });
  };

  const navigateToLoginScreen = () => {
    navigation.navigate('Login');
  };

  const handleRegister = async () => {
    try {
      const data = Object.assign(registerData, { countryCode: '+84' });
      await client.post('auth/sign_up', data);
      navigateToLoginScreen();
    } catch (error) {
      console.log(error);
    }
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
          {/* <FormCol2>
            <StretchContainer style={{ marginRight: 10 }}>
              <AppInput placeholder="Username Name" />
            </StretchContainer>
            <StretchContainer style={{ marginLeft: 10 }}>
              <AppInput placeholder="Last Name" />
            </StretchContainer>
          </FormCol2> */}
          <FormGroup>
            <AppInput
              placeholder="Phone number"
              name="phone"
              value={registerData.phone}
              onChangeText={(text) => handleChange('phone', text)}
            />
          </FormGroup>
          <FormGroup>
            <AppInput
              placeholder="Username"
              name="username"
              value={registerData.username}
              onChangeText={(text) => handleChange('username', text)}
            />
          </FormGroup>
          <FormGroup>
            <AppInput
              placeholder="New password"
              name="password"
              secureTextEntry
              value={registerData.password}
              onChangeText={(text) => handleChange('password', text)}
            />
          </FormGroup>
          <FormGroup>
            <AppInput
              placeholder="Confirm password"
              name="passwordConfirmation"
              secureTextEntry
              value={registerData.passwordConfirmation}
              onChangeText={(text) =>
                handleChange('passwordConfirmation', text)
              }
            />
          </FormGroup>
          {/* <FormGroup>
            <AppRadioGroup
              options={[
                { label: 'Male', value: 'male' },
                { label: 'Female', value: 'female' },
              ]}
            />
          </FormGroup> */}

          <AppButton onPress={handleRegister}>Register</AppButton>
        </StretchContainer>
        <AdaptiveContainer>
          <AppButton mode="outlined" onPress={navigateToLoginScreen}>
            Have an Account already? Sign In
          </AppButton>
        </AdaptiveContainer>
      </FormContainer>
    </ScrollView>
  );
};

export default RegisterScreen;
