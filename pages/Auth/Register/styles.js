import styled from 'styled-components';
import { View } from 'react-native';

export const StretchContainer = styled(View)`
  flex: 1;
`;

export const FormContainer = styled(StretchContainer)`
  padding: 35px 20px 20px 20px;
  background-color: #fff;
`;

export const FormGroup = styled(View)`
  margin-bottom: 25px;
`;

export const FormCol2 = styled(FormGroup)`
  flex-direction: row;
`;
