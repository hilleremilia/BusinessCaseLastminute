import { MD3LightTheme, MD3LightTheme as DefaultTheme } from 'react-native-paper';
import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from '@react-navigation/native';
import { adaptNavigationTheme } from 'react-native-paper';

const { LightTheme } = adaptNavigationTheme({
  reactNavigationLight: NavigationDefaultTheme,
  reactNavigationDark: NavigationDarkTheme,
});

const fontConfig: ReactNavigation.Theme['fonts'] = {
  regular: {
    fontFamily: 'Font',
    fontWeight: '400',
  },
  medium: {
    fontFamily: 'Font',
    fontWeight: '500',
  },
  bold: {
    fontFamily: 'Font',
    fontWeight: '600',
  },
  heavy: {
    fontFamily: 'Font',
    fontWeight: '900',
  },
};

export const theme = {
  ...DefaultTheme,
  ...LightTheme,
  colors: {
    ...DefaultTheme.colors,
    ...LightTheme.colors,
    backgroundLight: '#e5e9f8',
    background: '#FFFFFF',
    backgroundDark: '#ccd6e6',
    warning: '#FF9500',
    error: '#dd3333',
    transparent: '#00000000',
    primary: '#1cb7b8',
    secondary: '#4a5f77',
    tertiary: '#000000',
    textSecondary: '#FFFFFF',
  },
  fonts: {
    ...DefaultTheme.fonts,
    ...fontConfig,
  },
};

export type Theme = typeof theme;
