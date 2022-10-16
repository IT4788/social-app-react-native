import { ImageBackground, ScrollView } from 'react-native';
import React from 'react';
import { TextInput } from 'react-native-paper';
import AppInput from '../../../components/AppInput';
import { FormContainer, FormGroup, StretchContainer } from './styles';
import AppButton from '../../../components/AppButton';
import { AdaptiveButtonContainer } from '../../../components/common';

const LoginScreen = () => {
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
            />
          </FormGroup>
          <FormGroup>
            <AppInput
              left={<TextInput.Icon icon="lock-outline" />}
              placeholder="Password"
              secureTextEntry
            />
          </FormGroup>
          <AppButton>LOGIN</AppButton>
          <AdaptiveButtonContainer>
            <AppButton mode="text" style={{ marginTop: 10 }}>
              Forgot Password?
            </AppButton>
          </AdaptiveButtonContainer>
        </StretchContainer>
        <AdaptiveButtonContainer>
          <AppButton mode="outlined">CREATE NEXT SOCIAL ACCOUNT</AppButton>
        </AdaptiveButtonContainer>
      </FormContainer>
    </ScrollView>
  );
};

export default LoginScreen;
