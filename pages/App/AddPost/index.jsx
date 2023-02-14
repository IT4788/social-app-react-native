import React, { useEffect, useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View, Image } from 'react-native';
import styled from 'styled-components';
import FAIcon from 'react-native-vector-icons/FontAwesome5';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AppText from '../../../components/AppText';
import AppColors from '../../../theme/AppColors';
import { Avatar, Button, TextInput } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import { v4 as uuid } from 'uuid';
import { getUserAvatar } from '../../../utils/image';
import { useAuthContext } from '../../../context/AuthContext';
import useUpload from '../../../hooks/useUpload';
import { useMutation, useQuery } from '@tanstack/react-query';
import { addPost, getPostDetail, updatePost } from '../../../services/post';
import { useRoute } from '@react-navigation/native';

const Container = styled.SafeAreaView`
  background-color: #fff;
  flex-grow: 1;
`;

const Header = styled(View)`
  flex-direction: row;
  padding: 11px;
  border-bottom-color: rgba(0, 0, 0, 0.2);
  border-bottom-width: 1px;
`;

const SubmitBtn = styled(Button)`
  background-color: ${AppColors.primary};
  align-items: center;
  justify-content: center;
  border-radius: 4px;
`;

const SubmitBtnText = styled(Text)`
  color: #fff;
  font-size: 16px;
`;

const UserInfo = styled(View)`
  padding: 16px 11px;
  flex-direction: row;
`;

UserInfo.Title = styled(Text)`
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 4px;
`;

UserInfo.BtnGroup = styled(View)`
  flex-direction: row;
`;

UserInfo.BtnItem = styled(TouchableOpacity)`
  flex-direction: row;
  align-items: center;
  border: 1px solid rgba(0, 0, 0, 0.4);
  color: #333;
  border-radius: 4px;
  margin-right: 6px;
  padding: 4px 10px 4px 10px;
`;

UserInfo.BtnText = styled(Text)`
  color: rgba(0, 0, 0, 0.65);
  font-size: 10px;
  margin-left: 5px;
  margin-right: 5px;
`;

const Content = styled(View)`
  background-color: #fff;
`;

Content.TextArea = styled(TextInput)`
  background-color: #fff;
  color: #222121;
  font-size: 24px;
  font-weight: 400;
`;

Content.ImageContainer = styled(View)`
  flex-direction: row;
  flex-wrap: wrap;
`;
Content.ImageWrapper = styled(View)`
  width: 50%;
  aspect-ratio: 1;
  padding: 4px;
`;

Content.ImageItem = styled(Image)`
  width: 100%;
  aspect-ratio: 1;
`;

const Footer = styled(View)`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  /* background-color: red; */
`;

Footer.Icons = styled(View)`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0px 30px;
  border-top-color: rgba(0, 0, 0, 0.2);
  border-top-width: 0.5px;
  min-height: 50px;
  background-color: #fff;
`;

const MAX_IMAGE_ALLOWED = 4;

const AddPostScreen = ({ navigation }) => {
  const route = useRoute();
  const [text, setText] = useState('');
  const [images, setImages] = useState([]);

  const { user } = useAuthContext();
  const { handleOpenImageLib, handleUploadFile } = useUpload();
  const id = route.params?.id;

  const { data } = useQuery(['post', 'detail', id], () => getPostDetail(id), {
    enabled: !!id,
    select: (data) => data.data,
    onSuccess(data) {
      console.log('Get post detail success: ', data);
    },
    refetchOnWindowFocus: false,
    refetchInterval: false,
    refetchIntervalInBackground: false,
  });

  const post = data?.data?.post;

  useEffect(() => {
    if (!post) return;

    setText(post.describe);
    setImages(post.images?.map((u) => ({ uri: u, id: uuid() })) || []);
  }, [post]);

  // const handleSelectPhoto = async () => {
  //   if (Platform.OS !== 'web') {
  //     const { status } =
  //       await ImagePicker.requestMediaLibraryPermissionsAsync();

  //     if (status !== 'granted') {
  //       return alert(
  //         'Sorry, we need camera roll permissions to make this work!',
  //       );
  //     }
  //   }

  //   // No permissions request is necessary for launching the image library
  //   let result = await ImagePicker.launchImageLibraryAsync({
  //     mediaTypes: ImagePicker.MediaTypeOptions.All,
  //     // allowsEditing: true,
  //     aspect: [4, 3],
  //     quality: 1,
  //     allowsMultipleSelection: true,
  //     selectionLimit: MAX_IMAGE_ALLOWED - images.length,
  //     orderedSelection: true,
  //   });

  //   console.log(result);

  //   if (!result.cancelled) {
  //     const imagesSelected = result.selected ? result.selected : [result];

  //     if (images.length + imagesSelected.length <= MAX_IMAGE_ALLOWED) {
  //       setImages((prev) => [...prev, ...imagesSelected]);
  //     } else {
  //       alert('Exceed max images to upload');
  //     }
  //   }
  // };

  const handleSelectPhotoNew = async () => {
    const result = await handleOpenImageLib({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      // allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      allowsMultipleSelection: true,
      selectionLimit: MAX_IMAGE_ALLOWED - images.length,
      orderedSelection: true,
      base64: true,
    });

    if (!result.cancelled) {
      console.log({ result });
      const imagesSelected = result.selected ? result.selected : [result];

      if (images.length + imagesSelected.length <= MAX_IMAGE_ALLOWED) {
        console.log(images);
        const urls = await Promise.all(
          imagesSelected.map(async (image) => {
            let base64Img = `data:image/jpg;base64,${image.base64}`;
            const uploadRes = await handleUploadFile(base64Img);
            return uploadRes;
          }),
        );

        setImages((prev) => [
          ...prev,
          ...urls.map((u) => ({ uri: u, id: uuid() })),
        ]);
      } else {
        alert('Exceed max images to upload');
      }
    }
  };

  const { mutate: addPostMutation } = useMutation(addPost, {
    onSuccess() {
      setText('');
      setImages([]);
      navigation.push('Home');
    },
  });

  const handleSubmit = async () => {
    if (!text.trim() && !images.length) {
      alert('Please enter text or select images');
      return;
    }

    if (!id) {
      addPostMutation({
        describe: text.trim(),
        images: images.map((i) => i.uri),
        // baseUrl: 'http'
      });
    } else {
      await updatePost(id, {
        describe: text.trim(),
        images: images.map((i) => i.uri),
        // baseUrl: 'http'
      });

      setText('');
      setImages([]);
      navigation.push('Profile');
    }
  };

  useEffect(() => {
    return () => {
      setText('');
      setImages([]);
    };
  }, []);

  return (
    <>
      {/* <ScrollView style={{ backgroundColor: '#fff', height: '100%' }}> */}
      <Container>
        <Header>
          <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
            <FAIcon
              name="arrow-left"
              size={18}
              style={{ marginTop: -4 }}
              onPress={() => navigation.goBack()}
            />
            <AppText style={{ marginLeft: 20, fontSize: 18 }}>
              Tạo bài viết
            </AppText>
          </View>
          <SubmitBtn onPress={handleSubmit}>
            <SubmitBtnText>ĐĂNG</SubmitBtnText>
          </SubmitBtn>
        </Header>

        <UserInfo>
          <Avatar.Image source={{ uri: getUserAvatar(user) }} size={48} />
          <View style={{ marginLeft: 12 }}>
            <UserInfo.Title>{user?.username}</UserInfo.Title>
            <UserInfo.BtnGroup>
              <UserInfo.BtnItem>
                <FAIcon name="lock" color="rgba(0,0,0,0.65)" />
                <UserInfo.BtnText>Công khai</UserInfo.BtnText>
                <FAIcon name="caret-down" size={16} color="rgba(0,0,0,0.65)" />
              </UserInfo.BtnItem>
              <UserInfo.BtnItem>
                <Ionicons name="add" size={16} color="rgba(0,0,0,0.65)" />
                <UserInfo.BtnText>Album</UserInfo.BtnText>
                <FAIcon name="caret-down" size={16} color="rgba(0,0,0,0.65)" />
              </UserInfo.BtnItem>
            </UserInfo.BtnGroup>
          </View>
        </UserInfo>

        <Content>
          <ScrollView>
            <Content.TextArea
              selectionColor={AppColors.primary}
              activeUnderlineColor="transparent"
              underlineColor="transparent"
              placeholder="Bạn đang nghĩ gì?"
              multiline
              value={text}
              onChangeText={(newText) => setText(newText)}
            />

            <Content.ImageContainer>
              {images.map((image) => (
                <Content.ImageWrapper key={image.id}>
                  <Content.ImageItem source={{ uri: image.uri }} />
                </Content.ImageWrapper>
              ))}
              <Content.ImageItem />
            </Content.ImageContainer>
          </ScrollView>
        </Content>
      </Container>
      {/* </ScrollView> */}
      <View style={{ height: 60, backgroundColor: '#fff' }}></View>
      <Footer>
        <Footer.Icons>
          <TouchableOpacity onPress={handleSelectPhotoNew}>
            <Ionicons color="green" size={24} name="md-images" />
          </TouchableOpacity>
          <TouchableOpacity>
            <FAIcon color="blue" size={22} name="user-tag" />
          </TouchableOpacity>

          <TouchableOpacity>
            <MCIcon color="orange" size={24} name="emoticon-outline" />
          </TouchableOpacity>

          <TouchableOpacity>
            <Ionicons color="red" size={24} name="location-sharp" />
          </TouchableOpacity>

          <TouchableOpacity>
            <Ionicons
              size={24}
              color="#333"
              name="ellipsis-horizontal-circle-sharp"
            />
          </TouchableOpacity>
        </Footer.Icons>
      </Footer>
    </>
  );
};

export default AddPostScreen;
