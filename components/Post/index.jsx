import React, { useEffect, useState } from 'react';
import Avatar from '../Avatar';
import { TouchableOpacity, View } from 'react-native';
import { Entypo, MaterialCommunityIcons } from '@expo/vector-icons';
import AppText from '../AppText';
import styled from 'styled-components/native';
import { useAuthContext } from '../../context/AuthContext';
import { getUserAvatar } from '../../utils/image';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import PostImages from './PostImages';
import { useMutation } from '@tanstack/react-query';
import { createReaction } from '../../services/reaction';
import { deletePost } from '../../services/post';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const Container = styled.View`
  /* flex: 1; */
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
  font-size: 14px;
  color: #222121;
  line-height: 16px;
  padding: 0 11px;
  margin-top: 10px;
  margin-bottom: 5px;
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

dayjs.extend(relativeTime);

const Post = ({ post, onDeletePostSuccess }) => {
  const navigation = useNavigation();
  const handleShowPostDetail = () => {
    if (post?.images.length) {
      navigation.push('PostDetail', { id: post._id });
    } else {
      navigation.push('Comments', { id: post._id });
    }
  };
  const { user } = useAuthContext();

  const isOwn = user?._id === post?.userId?._id;

  const handleGoToProfile = () => {
    // tempory hard code
    if (isOwn) {
      navigation.push('Profile');
    } else {
      navigation.push('ProfileX', { id: post?.userId?._id });
    }
  };

  const handleClickComment = () => {
    navigation.push('Comments', { id: post._id });
  };

  const handleClickEditPost = () => {
    navigation.push('AddPost', { id: post._id });
  };

  const [likeCnt, setLikeCnt] = useState(post?.line_cnt);
  const [isLiked, setIsLiked] = useState(post?.is_liked);

  const { mutate } = useMutation(createReaction);

  const handleClickLikePost = () => {
    if (!post?._id) return;
    if (isLiked) {
      setIsLiked(false);
      setLikeCnt((prev) => prev - 1);
    } else {
      setIsLiked(true);
      setLikeCnt((prev) => prev + 1);
    }
    mutate({ postId: post?._id, reactType: 'like' });
  };

  const handleRemovePost = async (id) => {
    await deletePost(id);
    onDeletePostSuccess?.(id);
  };

  useEffect(() => {
    setLikeCnt(post?.like_cnt);
    setIsLiked(!!post?.is_liked);
  }, [post]);

  return (
    <Container>
      <Header>
        <Row>
          <TouchableOpacity onPress={handleGoToProfile}>
            <Avatar
              source={{
                uri: getUserAvatar(post?.userId?.avatar),
              }}
            />
          </TouchableOpacity>
          <View style={{ paddingLeft: 10 }}>
            <User>{post?.userId?.username}</User>
            <Row>
              <Time>{dayjs(post?.createdAt).fromNow()}</Time>
              <Entypo name="dot-single" size={12} color="#747476" />
              <Entypo name="globe" size={10} color="#747476" />
            </Row>
          </View>
        </Row>

        <Entypo name="dots-three-horizontal" size={15} color="#222121" />
      </Header>

      {post?.describe && (
        <TouchableOpacity onPress={handleShowPostDetail}>
          <PostTitle>{post.describe}</PostTitle>
        </TouchableOpacity>
      )}

      <PostImages postId={post?._id} images={post?.images} />

      <Footer>
        <FooterCount>
          <Row>
            <IconCount>
              <MaterialCommunityIcons
                name="thumb-up"
                size={12}
                color="#FFFFFF"
              />
              {/* <AntDesign name="like1" size={12} color="#FFFFFF" /> */}
            </IconCount>
            <TextCount>
              {likeCnt} {likeCnt > 1 ? 'likes' : 'like'}
            </TextCount>
          </Row>
          <TextCount>
            {post?.totalComment || 0}{' '}
            {post?.totalComment > 1 ? 'comments' : 'comment'}
          </TextCount>
        </FooterCount>

        <Separator />

        <FooterMenu>
          <Button onPress={handleClickLikePost}>
            <Icon>
              <MaterialCommunityIcons
                name={isLiked ? 'thumb-up' : 'thumb-up-outline'}
                size={20}
                color={isLiked ? '#1877f2' : '#424040'}
              />
            </Icon>
            <AppText>Like</AppText>
          </Button>

          <Button onPress={handleClickComment}>
            <Icon>
              <MaterialCommunityIcons
                name="comment-outline"
                size={20}
                color="#424040"
              />
            </Icon>
            <AppText>Comment</AppText>
          </Button>

          {isOwn ? (
            <Button onPress={handleClickEditPost}>
              <Icon>
                <AntDesign name="edit" size={20} color="#424040" />
              </Icon>
              <AppText>Edit</AppText>
            </Button>
          ) : null}

          {isOwn ? (
            <Button onPress={() => handleRemovePost(post?._id)}>
              <Icon>
                <MaterialCommunityIcons
                  name="delete-outline"
                  size={20}
                  color="#424040"
                />
              </Icon>
              <AppText>Remove</AppText>
            </Button>
          ) : (
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
          )}
        </FooterMenu>
      </Footer>
      <BottomDivider />
    </Container>
  );
};

export default Post;
