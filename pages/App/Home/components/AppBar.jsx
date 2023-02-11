import React from 'react';

import styled from 'styled-components/native';
import * as navigation from '../../../../navigation/helpers';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';

const Container = styled.View`
  width: 100%;
  height: 58px;
  padding: 0 11px;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
`;
const Text = styled.Text`
  color: #3a86e9;
  font-size: 25px;
  font-weight: bold;
  letter-spacing: -0.3px;
`;
const Row = styled.View`
  flex-direction: row;
`;
const Button = styled.TouchableOpacity`
  width: 42px;
  height: 42px;
  border-radius: 21px;
  background: #eeeeee;
  align-items: center;
  justify-content: center;
  margin-left: 6px;
`;

const AppBar = () => {
  const onPressNotification = () => {
    navigation.navigate('Notifications');
  };

  const onPressMenu = () => {
    navigation.navigate('MyPage');
  };

  const onPressMessages = () => {
    navigation.navigate('Messages');
  };

  return (
    <Container>
      <Text>facebook</Text>
      <Row>
        <Button onPress={onPressNotification}>
          <Ionicons name="notifications-outline" size={24} color="black" />
          {/* <Feather name="search" size={24} color="black" /> */}
        </Button>

        <Button onPress={onPressMessages}>
          <MaterialCommunityIcons name="facebook-messenger" size={24} />
        </Button>

        <Button onPress={onPressMenu}>
          <Ionicons name="menu-outline" size={24} color="black" />
        </Button>
      </Row>
    </Container>
  );
};

export default AppBar;
