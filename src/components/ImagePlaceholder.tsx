import { StyleSheet, View } from 'react-native';
import React from 'react';
import { Text } from 'react-native-paper';

interface Props {
  width: number;
}

export const ImagePlaceholder = ({ width }: Props) => {
  return (
    <View style={[styles.container, { width: width, height: width }]}>
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
