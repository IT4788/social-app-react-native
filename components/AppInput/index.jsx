import React from 'react';
import { TextInput } from 'react-native-paper';
import styled from 'styled-components';
import AppFonts from '../../theme/AppFonts';

const CustomInput = styled(TextInput)`
  background-color: #fff;
  font-family: ${AppFonts.FRegular};
  height: 50px;
`;

const AppInput = ({ ...props }) => {
  return (
    <CustomInput
      mode="flat"
      placeholderTextColor="rgba(0,0,0,0.4)"
      {...props}
    />
  );
};

export default AppInput;
