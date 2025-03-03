import { MD3LightTheme as DefaultTheme } from 'react-native-paper';

export const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#D4DDEC',
    backgroundLight: '#FFFFFF',
    warning: '#FF9500',
    error: '#dd3333',
    transparent: '#00000000',
    primary: '#1cb7b8',
    secondary: '#4a5f77',
    text: '#000000',
    textSecondary: '#FFFFFF',
  },
};

export type Theme = typeof theme;
