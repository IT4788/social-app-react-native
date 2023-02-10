import React from 'react';
import Avatar from '../Avatar';
import { TouchableOpacity, View } from 'react-native';
import { Entypo, AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import AppText from '../AppText';
import styled from 'styled-components/native';
import * as navigation from '../../navigation/helpers';

const Container = styled.View`
  flex: 1;
  background-color: #fff;
`;
const Header = styled.View`
  height: 50px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: 6px;
  padding: 0 11px;
`;
const Row = styled.View`
  align-items: center;
  flex-direction: row;
`;
const User = styled(AppText)`
  font-size: 12px;
  font-weight: bold;
  color: #222121;
`;
const Time = styled(AppText)`
  font-size: 9px;
  color: #747476;
`;
const PostTitle = styled(AppText)`
  font-size: 12px;
  color: #222121;
  line-height: 16px;
  padding: 0 11px;
`;
const Photo = styled.Image`
  margin-top: 9px;
  width: 100%;
  height: 300px;
`;
const Footer = styled.View`
  padding: 0 11px;
`;
const FooterCount = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding: 9px 0;
`;
const IconCount = styled.View`
  background: #1878f3;
  width: 20px;
  height: 20px;
  border-radius: 10px;
  align-items: center;
  justify-content: center;
  margin-right: 6px;
`;
const TextCount = styled(AppText)`
  font-size: 11px;
  color: #424040;
`;
const Separator = styled.View`
  width: 100%;
  height: 1px;
  background: #f9f9f9;
`;
const FooterMenu = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding: 9px 0;
`;
const Button = styled.TouchableOpacity`
  flex-direction: row;
`;
const Icon = styled.View`
  margin-right: 6px;
`;
const BottomDivider = styled.View`
  width: 100%;
  height: 9px;
  background: #f0f2f5;
`;

const Post = () => {
  const handleShowPostDetail = () => {
    navigation.navigate('PostDetail');
  };

  const handleGoToProfile = () => {
    navigation.navigate('ProfileX');
  };

  return (
    <Container>
      <Header>
        <Row>
          <TouchableOpacity onPress={handleGoToProfile}>
            <Avatar
              source={{
                uri: 'https://images.unsplash.com/photo-1510227272981-87123e259b17?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=3759e09a5b9fbe53088b23c615b6312e',
              }}
            />
          </TouchableOpacity>
          <View style={{ paddingLeft: 10 }}>
            <User>Regi P</User>
            <Row>
              <Time>9m</Time>
              <Entypo name="dot-single" size={12} color="#747476" />
              <Entypo name="globe" size={10} color="#747476" />
            </Row>
          </View>
        </Row>

        <Entypo name="dots-three-horizontal" size={15} color="#222121" />
      </Header>

      <TouchableOpacity onPress={handleShowPostDetail}>
        <PostTitle>
          Crie na prática uma aplicação utilizando NextJS, ReactJS, React Native
          e Strap Api.
        </PostTitle>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleShowPostDetail}>
        <Photo
          source={{
            uri: 'https://images.unsplash.com/photo-1674458884347-0b5460be866b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyMnx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60',
          }}
        />
      </TouchableOpacity>

      <Footer>
        <FooterCount>
          <Row>
            <IconCount>
              <AntDesign name="like1" size={12} color="#FFFFFF" />
            </IconCount>
            <TextCount>88 likes</TextCount>
          </Row>
          <TextCount>2k comments</TextCount>
        </FooterCount>

        <Separator />

        <FooterMenu>
          <Button>
            <Icon>
              <AntDesign name="like2" size={20} color="#424040" />
            </Icon>
            <AppText>Like</AppText>
          </Button>

          <Button>
            <Icon>
              <MaterialCommunityIcons
                name="comment-outline"
                size={20}
                color="#424040"
              />
            </Icon>
            <AppText>Comment</AppText>
          </Button>

          <Button>
            <Icon>
              <MaterialCommunityIcons
                name="share-outline"
                size={20}
                color="#424040"
              />
            </Icon>
            <AppText>Share</AppText>
          </Button>
        </FooterMenu>
      </Footer>
      <BottomDivider />
    </Container>
  );
};

export default Post;
