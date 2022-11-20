import React from 'react';
import { StatusBar, ScrollView } from 'react-native';
import styled from 'styled-components';
import AppBar from './components/AppBar';
import ToolBar from './components/ToolBar';
import Users from './components/Users';
import Story from './components/Story';
import Feed from './components/Feed';

const Container = styled.SafeAreaView`
  flex: 1;
`;

const HomeScreen = ({ navigation }) => {
  return (
    <>
      <StatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />
      <Container>
        <ScrollView>
          <AppBar />
          <ToolBar navigation={navigation} />
          <Users />
          <Story />
          <Feed />
        </ScrollView>
      </Container>
    </>
  );
};

export default HomeScreen;
