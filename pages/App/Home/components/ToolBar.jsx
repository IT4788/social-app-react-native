import React from 'react';
import AppText from '../../../../components/AppText';
import styled from 'styled-components';
import * as navigation from '../../../../navigation/helpers';

import {
  Ionicons,
  MaterialIcons,
  MaterialCommunityIcons,
} from '@expo/vector-icons';

import Avatar from './Avatar';
import { TouchableOpacity } from 'react-native';
import { useAuthContext } from '../../../../context/AuthContext';
import { getUserAvatar } from '../../../../utils/image';

const Container = styled.View`
  width: 100%;
  height: 110px;
`;
const Row = styled.View`
  flex-direction: row;
  background: #ffffff;
  width: 100%;
  padding: 0 11px;
  align-items: center;
`;

const HeaderRow = styled(Row)`
  padding-top: 11px;
  padding-bottom: 11px;
`;

const InpuBox = styled(TouchableOpacity)`
  height: 32px;
  flex: 1;
  margin-left: 8px;
  padding: 4px 20px;
  justify-content: center;
  border: 1px solid #f2f2f2;
  border-radius: 1000px;
`;
const Divider = styled.View`
  width: 100%;
  height: 0.5px;
  background: #f0f0f0;
`;
const Menu = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: 42px;
`;
const MenuText = styled(AppText)`
  padding-left: 11px;
  font-weight: 500;
  font-size: 12px;
`;
const Separator = styled.View`
  width: 1px;
  height: 26px;
  background: #f0f0f0;
`;
const BottomDivider = styled.View`
  width: 100%;
  height: 9px;
  background: #f0f2f5;
`;

const ToolBar = () => {
  const { user } = useAuthContext();

  const onClickAddPost = () => {
    navigation.navigate('AddPost');
  };
  return (
    <>
      <Container>
        <HeaderRow>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Profile');
            }}
          >
            <Avatar source={{ uri: getUserAvatar(user) }} />
          </TouchableOpacity>
          <InpuBox onPress={onClickAddPost}>
            <AppText>Bạn đang nghĩ gì</AppText>
          </InpuBox>
        </HeaderRow>
        <Divider />
        <Row>
          <Menu>
            <Ionicons name="ios-videocam" size={22} color="#F44337" />
            <MenuText>Live</MenuText>
          </Menu>
          <Separator />

          <Menu>
            <MaterialIcons
              name="photo-size-select-actual"
              size={20}
              color="#4CAF50"
            />
            <MenuText>Photo</MenuText>
          </Menu>
          <Separator />

          <Menu>
            <MaterialCommunityIcons
              name="video-plus"
              size={22}
              color="#E141FC"
            />
            <MenuText>Room</MenuText>
          </Menu>
        </Row>
      </Container>
      <BottomDivider />
    </>
  );
};

export default ToolBar;
