import { Hotel } from '../types/hotel.ts';
import React from 'react';
import { Text, View } from 'react-native';

interface Props {
  hotel: Hotel;
}

export const HotelDetails = ({ hotel }: Props) => {
  return (
    <View>
      <Text>{hotel?.location?.city}</Text>
    </View>
  );
};
