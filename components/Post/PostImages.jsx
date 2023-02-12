import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import styled from 'styled-components/native';

const Photo = styled.Image`
  margin-top: 9px;
  width: 100%;
  height: 300px;
`;

const PostImages = ({ postId, images }) => {
  const navigation = useNavigation();

  const handleShowPostDetail = (image) => {
    navigation.navigate('PostDetail', { id: postId, image });
  };

  if (!images?.length) return null;

  if (images.length === 1) {
    return (
      <TouchableOpacity onPress={() => handleShowPostDetail(images[0])}>
        <Photo
          source={{
            uri: images[0],
          }}
        />
      </TouchableOpacity>
    );
  }

  if (images.length === 2) {
    return (
      <View style={{ flexDirection: 'row' }}>
        <View style={{ width: '50%' }}>
          <TouchableOpacity onPress={() => handleShowPostDetail(images[0])}>
            <Photo
              source={{
                uri: images[0],
              }}
            />
          </TouchableOpacity>
        </View>
        <View style={{ width: '50%' }}>
          <TouchableOpacity onPress={() => handleShowPostDetail(images[1])}>
            <Photo
              source={{
                uri: images[1],
              }}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  if (images.length === 3) {
    return (
      <View style={{ flexDirection: 'row' }}>
        <View style={{ width: '50%' }}>
          <TouchableOpacity onPress={() => handleShowPostDetail(images[0])}>
            <Photo
              source={{
                uri: images[0],
              }}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleShowPostDetail(images[2])}>
            <Photo
              source={{
                uri: images[2],
              }}
            />
          </TouchableOpacity>
        </View>
        <View style={{ width: '50%' }}>
          <TouchableOpacity onPress={() => handleShowPostDetail(images[1])}>
            <Photo
              source={{
                uri: images[1],
              }}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  if (images.length === 4) {
    return (
      <View style={{ flexDirection: 'row' }}>
        <View style={{ width: '50%' }}>
          <TouchableOpacity onPress={() => handleShowPostDetail(images[0])}>
            <Photo
              source={{
                uri: images[0],
              }}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleShowPostDetail(images[2])}>
            <Photo
              source={{
                uri: images[2],
              }}
            />
          </TouchableOpacity>
        </View>
        <View style={{ width: '50%' }}>
          <TouchableOpacity onPress={() => handleShowPostDetail(images[1])}>
            <Photo
              source={{
                uri: images[1],
              }}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleShowPostDetail(images[3])}>
            <Photo
              source={{
                uri: images[3],
              }}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return null;
};

export default PostImages;
