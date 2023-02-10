import React, { useEffect, useState } from 'react';
import { Image } from 'react-native';
const ScaledImage = ({ source, style = {}, width, height }) => {
  const [imgWidth, setImgWidth] = useState(0);
  const [imgHeight, setImgHeight] = useState(0);

  useEffect(() => {
    Image.getSize(source, (w, h) => {
      if (width && !height) {
        setImgHeight(h * (width / w));
        setImgWidth(width);
      } else if (!width && height) {
        setImgHeight(height);
        setImgWidth(w * (height / h));
      } else {
        setImgHeight(h);
        setImgWidth(w);
      }
    });
  }, [source, width, height]);

  return (
    <Image
      source={{ uri: source }}
      style={{
        height: imgHeight,
        width: imgWidth,
        ...style,
      }}
    />
  );
};

export default ScaledImage;
