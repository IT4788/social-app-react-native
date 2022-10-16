import React from 'react';
import Onboarding from 'react-native-onboarding-swiper';
import { Image } from 'react-native';
import { Button } from 'react-native-paper';

const DoneButton = ({ onPress }) => {
  return (
    <Button
      mode="contained"
      onPress={onPress}
      textColor="#333"
      buttonColor="#fafafa"
      style={{
        marginRight: 16,
      }}
    >
      DONE
    </Button>
  );
};
const SkipButton = ({ onPress }) => {
  return (
    <Button
      mode="outlined"
      textColor="#fff"
      buttonColor="#333"
      onPress={onPress}
      style={{
        borderColor: '#fafafa',
        marginLeft: 16,
      }}
    >
      SKIP
    </Button>
  );
};
const NextButton = ({ onPress }) => {
  return (
    <Button
      mode="contained"
      onPress={onPress}
      textColor="#333"
      buttonColor="#fafafa"
      style={{
        marginRight: 16,
      }}
    >
      NEXT
    </Button>
  );
};

const OnboardingScreen = ({ navigation }) => {
  return (
    <Onboarding
      onSkip={() => navigation.replace('Login')}
      onDone={() => navigation.replace('Login')}
      bottomBarColor="rgba(0,0,0,0.2)"
      titleStyles={{ fontWeight: '600', color: '#333' }}
      NextButtonComponent={NextButton}
      bottomBarHeight={75}
      controlStatusBar={false}
      DoneButtonComponent={DoneButton}
      SkipButtonComponent={SkipButton}
      pages={[
        {
          backgroundColor: '#a6e4d0',
          image: (
            <Image
              source={require('../../assets/images/onboarding/onboarding-1.png')}
            />
          ),
          title: 'Share your Thought',
          subtitle: 'Done with React Native Onboarding Swiper',
        },
        {
          backgroundColor: '#fedd93',
          image: (
            <Image
              source={require('../../assets/images/onboarding/onboarding-2.png')}
            />
          ),
          title: 'Stay connect with your friends',
          subtitle: 'Done with React Native Onboarding Swiper',
        },
        {
          backgroundColor: '#e9bcbe',
          image: (
            <Image
              source={require('../../assets/images/onboarding/onboarding-3.png')}
            />
          ),
          title: 'Find more friends',
          subtitle: 'Done with React Native Onboarding Swiper',
        },
      ]}
    />
  );
};

export default OnboardingScreen;
