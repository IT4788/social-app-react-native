import React from 'react';
import { StyleSheet, View, TouchableOpacity, Image } from 'react-native';
import { SCREEN_WIDTH } from '../../constants';

const HightlightPhotos = ({ photos, isFullRadius }) => {
  return (
    <View style={styles.highlightPhotosWrapper}>
      {photos.map((photo, index) => (
        <TouchableOpacity key={index} activeOpacity={0.8}>
          <Image
            style={{
              ...styles.photo,
              marginBottom: index < 6 ? 6 : 0,
              borderRadius: isFullRadius === true ? 10 : 0,
            }}
            source={{ uri: photo.photo_url }}
          />
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default HightlightPhotos;

const styles = StyleSheet.create({
  highlightPhotosWrapper: {
    flexDirection: 'row',
    borderRadius: 10,
    flexWrap: 'wrap',
    overflow: 'hidden',
    justifyContent: 'space-between',
  },
  highLightPhoto: {},
  photo: {
    width: (SCREEN_WIDTH - 42) / 3,
    height: (SCREEN_WIDTH - 42) / 3,
  },
});
