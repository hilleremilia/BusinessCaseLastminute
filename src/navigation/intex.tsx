import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createStaticNavigation } from '@react-navigation/native';
import { HomeScreen } from '../screens/HomeScreen.tsx';

const RootStack = createNativeStackNavigator({
  screens: {
    Home: HomeScreen,
  },
});

export const Navigation = createStaticNavigation(RootStack);
