import React from 'react';
import { Icon, useTheme } from 'react-native-paper';
import { StyleSheet, View } from 'react-native';
import { Theme } from '../config/theme.ts';

interface Props {
  stars: number;
}

export const Stars = ({ stars }: Props) => {
  const starsArray = [...Array(stars).keys()];
  const theme = useTheme<Theme>();

  return (
    <View style={styles.container}>
      {starsArray.map((star) => (
        <Icon source="star" size={20} key={star} color={theme.colors.warning} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 16,
  },
});
