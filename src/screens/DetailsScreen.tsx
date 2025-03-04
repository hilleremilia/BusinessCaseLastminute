import React, { useEffect } from 'react';
import { RootStackParamList } from '../navigation';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

export type Props = NativeStackScreenProps<RootStackParamList, 'Details'>;

export const DetailsScreen = ({ route, navigation }: Props) => {
  const { hotel } = route.params;

  useEffect(() => {
    navigation?.setOptions({ title: hotel.name });
  }, [navigation, hotel.name]);

  return <></>;
};
