import React from 'react';
import { Button } from 'react-native-paper';
import styled from 'styled-components';
import AppFonts from '../../theme/AppFonts';

const CustomButton = styled(Button)`
  border-radius: 4px;
  padding: 3px;
`;

const AppButton = ({
  children,
  labelStyle = {},
  mode = 'contained',
  ...props
}) => {
  return (
    <CustomButton
      labelStyle={{
        fontFamily: AppFonts.FSemiBold,
        color: mode === 'contained' ? '#fff' : 'rgba(0,0,0,0.5)',
        ...labelStyle,
      }}
      elevation
      mode={mode}
      {...props}
    >
      {children}
    </CustomButton>
  );
};

export default AppButton;
