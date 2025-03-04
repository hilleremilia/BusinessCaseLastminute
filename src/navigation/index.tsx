import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { HomeScreen } from '../screens/HomeScreen.tsx';
import { DetailsScreen } from '../screens/DetailsScreen.tsx';
import { Hotel } from '../types/hotel.ts';

export type RootStackParamList = {
  Home: undefined;
  Details: { hotel: Hotel };
};

export type HomeScreenNavigationProps = NativeStackNavigationProp<RootStackParamList, 'Home'>;

const Stack = createNativeStackNavigator<RootStackParamList>();

export const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Details" component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
