import React from 'react';

import styled from 'styled-components/native';

const Container = styled.View`
  width: ${({ width }) => `${width}px`};
  height: ${({ width }) => `${width}px`};
  position: relative;
`;
const User = styled.Image`
  width: ${({ width }) => `${width}px`};
  height: ${({ width }) => `${width}px`};
  border-radius: 100000px;
  border-color: #1777f2;
  border-width: ${(props) => (props.story ? '3px' : 0)};
`;
const UserActive = styled.View`
  width: 15px;
  height: 15px;
  border-radius: 8px;
  background: #4bcb1f;
  position: absolute;
  bottom: -2px;
  right: -2px;
  border-width: 2px;
  border-color: #ffffff;
`;

const Avatar = ({ source, online, story, width = 40 }) => {
  return (
    <Container width={width}>
      <User source={source} story={story} width={width} />
      {online && <UserActive />}
    </Container>
  );
};

export default Avatar;
