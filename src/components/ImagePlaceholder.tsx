import { StyleSheet, View } from 'react-native';
import React from 'react';
import { Text } from 'react-native-paper';

interface Props {
  size: number;
}

export const ImagePlaceholder = ({ size }: Props) => {
  return (
    <View style={[styles.container, { width: size, height: size }]}>
      <Text variant="bodyMedium">Image not found</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
