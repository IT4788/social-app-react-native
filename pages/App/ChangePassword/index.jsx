import React, { useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import ExTouchableOpacity from '../../../components/ExTouchableOpacity';
import AppText from '../../../components/AppText';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
// import HightlightPhotos from '../../../components/HightlightPhotos';
import { SCREEN_HEIGHT, STATUSBAR_HEIGHT } from '../../../constants';
import * as navigation from '../../../navigation/helpers';
import AppInput from '../../../components/AppInput';
import { Controller, useForm } from 'react-hook-form';
// import { useAuthContext } from '../../../context/AuthContext';
import { useMutation } from '@tanstack/react-query';
import { TextInput } from 'react-native-paper';
import AppButton from '../../../components/AppButton';
import { changePassword } from '../../../services/user';

const defaultValues = {
  oldPassword: '',
  newPassword: '',
  passwordConfirmation: '',
};

const ChangePasswordScreen = () => {
  // const { user: loggedInUser } = useAuthContext();
  // const id = loggedInUser?._id;

  const [error, setError] = useState(null);
  const { control, getValues } = useForm({ defaultValues });

  const onPressGoBackHandler = () => {
    navigation.goBack();
  };

  const { mutate } = useMutation(changePassword, {
    onSuccess() {
      setError(null);
      alert('Change password success');
      navigation.replace('MyPage');
    },
    onError(error) {
      setError(error?.response?.data?.error?.message);
      console.log({ ...error });
    },
  });

  const handleChangePassword = () => {
    const data = getValues();

    mutate(data);
  };

  return (
    <View style={styles.container}>
      <View style={styles.navigationBar}>
        <ExTouchableOpacity
          onPress={onPressGoBackHandler}
          style={styles.btnBack}
        >
          <FontAwesome5Icon name="arrow-left" color="#000" size={20} />
        </ExTouchableOpacity>
        <AppText style={styles.navigationTitle}>Change your password</AppText>
      </View>
      <ScrollView bounces={false} style={styles.detailsWrapper}>
        <View style={{ marginBottom: 10 }}>
          <Controller
            control={control}
            name="oldPassword"
            render={({ field: { value, onChange } }) => (
              <AppInput
                left={<TextInput.Icon icon="lock-outline" />}
                mode="outlined"
                secureTextEntry
                placeholder="Current password"
                value={value}
                onChangeText={(text) => onChange({ target: { value: text } })}
              />
            )}
          />
        </View>

        <View style={{ marginBottom: 10 }}>
          <Controller
            control={control}
            name="newPassword"
            render={({ field: { value, onChange } }) => (
              <AppInput
                left={<TextInput.Icon icon="key-outline" />}
                mode="outlined"
                secureTextEntry
                placeholder="New password"
                value={value}
                onChangeText={(text) => onChange({ target: { value: text } })}
              />
            )}
          />
        </View>

        <View style={{ marginBottom: 10 }}>
          <Controller
            control={control}
            name="passwordConfirmation"
            render={({ field: { value, onChange } }) => (
              <AppInput
                left={<TextInput.Icon icon="key-outline" />}
                mode="outlined"
                secureTextEntry
                placeholder="New password confirmation"
                value={value}
                onChangeText={(text) => onChange({ target: { value: text } })}
              />
            )}
          />
        </View>

        <View style={{ marginBottom: 10 }}>
          <AppButton onPress={handleChangePassword} mode="contained">
            Update Password
          </AppButton>
        </View>
        <AppButton onPress={onPressGoBackHandler} mode="outlined">
          Cancel
        </AppButton>

        {error && (
          <AppText style={{ marginTop: 10, textAlign: 'center', color: 'red' }}>
            {error}
          </AppText>
        )}
      </ScrollView>
    </View>
  );
};

export default ChangePasswordScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  navigationBar: {
    paddingTop: STATUSBAR_HEIGHT,
    flexDirection: 'row',
    height: 94,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  btnBack: {
    width: 50,
    alignItems: 'center',
  },
  navigationTitle: {
    fontSize: 18,
  },
  detailsWrapper: {
    padding: 15,
    height: SCREEN_HEIGHT - (50 + STATUSBAR_HEIGHT),
  },
  detail: {
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
    paddingVertical: 15,
  },
  detailTitleWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  detailTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  avatar: {
    width: 140,
    height: 140,
    alignSelf: 'center',
    borderRadius: 140,
  },
  cover: {
    width: '100%',
    height: 200,
    marginVertical: 10,
    borderRadius: 10,
  },
  introTxt: {
    color: '#333',
    alignSelf: 'center',
    marginVertical: 10,
  },
  introListWrapper: {
    paddingVertical: 10,
  },
  introLine: {
    // flexDirection: 'row',
    // height: 40,
    // alignItems: 'center',
    marginBottom: 20,
  },
  introIcon: {
    width: 30,
  },
  introLineText: {
    fontSize: 16,
    fontWeight: '400',
  },
  introHightLight: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  highlightGallery: {
    marginVertical: 10,
  },
  lastDetail: {
    marginBottom: 30,
    borderBottomWidth: 0,
  },
  btnModifyMore: {
    height: 40,
    width: '100%',
    backgroundColor: '#9dd0eb',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    borderRadius: 5,
  },
});
