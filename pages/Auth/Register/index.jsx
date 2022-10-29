import { ImageBackground, ScrollView } from 'react-native';
import React from 'react';
import AppInput from '../../../components/AppInput';
import { FormCol2, FormContainer, FormGroup, StretchContainer } from './styles';
import AppButton from '../../../components/AppButton';
import { AdaptiveContainer } from '../../../components/common';
import AppRadioGroup from '../../../components/AppRadioGroup';

const RegisterScreen = ({ navigation }) => {
  const navigateToLoginScreen = () => {
    navigation.navigate('Login');
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
          <FormCol2>
            <StretchContainer style={{ marginRight: 10 }}>
              <AppInput placeholder="First Name" />
            </StretchContainer>
            <StretchContainer style={{ marginLeft: 10 }}>
              <AppInput placeholder="Last Name" />
            </StretchContainer>
          </FormCol2>
          <FormGroup>
            <AppInput placeholder="Email or phone" />
          </FormGroup>
          <FormGroup>
            <AppInput placeholder="New password" secureTextEntry />
          </FormGroup>
          <FormGroup>
            <AppRadioGroup
              options={[
                { label: 'Male', value: 'male' },
                { label: 'Female', value: 'female' },
              ]}
            />
          </FormGroup>

          <AppButton>Register</AppButton>
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
