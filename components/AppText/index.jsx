import React from 'react';
import { AppTextContainer } from './styles';

const AppText = ({ children, ...props }) => {
  return <AppTextContainer {...props}>{children}</AppTextContainer>;
};

export default AppText;
