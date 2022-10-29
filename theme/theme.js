import { MD3LightTheme as DefaultTheme } from 'react-native-paper';
import AppColors from './AppColors';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: AppColors.primary,
  },
};

export default theme;
