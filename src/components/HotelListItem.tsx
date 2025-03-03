import { Card, useTheme } from 'react-native-paper';
import React from 'react';
import { Hotel } from '../types/hotel.ts';
import { Theme } from '../config/theme.ts';
import { StyleSheet } from 'react-native';
import { Stars } from './Stars.tsx';

interface Props {
  hotel: Hotel;
}

export const HotelListItem = ({ hotel }: Props) => {
  const theme = useTheme<Theme>();
  const styles = makeStyles(theme);

  return (
    <Card style={styles.card}>
      <Card.Title
        title={hotel?.name}
        subtitle={hotel?.location?.city}
        right={() => (hotel?.stars ? <Stars stars={hotel?.stars} /> : null)}
      />
    </Card>
  );
};

const makeStyles = (theme: Theme) =>
  StyleSheet.create({
    card: {
      backgroundColor: theme.colors.backgroundDark,
      marginBottom: 16,
    },
  });
