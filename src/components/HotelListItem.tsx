import { Button, Card, Divider, Text, useTheme } from 'react-native-paper';
import React from 'react';
import { Hotel } from '../types/hotel.ts';
import { Theme } from '../config/theme.ts';
import { StyleSheet } from 'react-native';
import { Stars } from './Stars.tsx';
import { useNavigation } from '@react-navigation/native';
import { HomeScreenNavigationProps } from '../navigation';

interface Props {
  hotel: Hotel;
}

export const HotelListItem = ({ hotel }: Props) => {
  const theme = useTheme<Theme>();
  const styles = makeStyles(theme);
  const navigation = useNavigation<HomeScreenNavigationProps>();

  const handleSeeMoreClick = () => navigation.navigate('Details', { hotel });

  return (
    <Card style={styles.card}>
      <Card.Title
        title={hotel?.name}
        subtitle={`Rated ${hotel?.userRating}`}
        right={() => (hotel?.stars ? <Stars stars={hotel?.stars} /> : null)}
      />
      <Divider style={styles.divider} />
      <Card.Content>
        <Text variant="bodySmall">Price</Text>
        <Text variant="bodyMedium">
          {hotel?.price} {hotel?.currency}
        </Text>
      </Card.Content>
      <Divider style={styles.divider} />
      <Card.Content>
        <Text variant="bodySmall">Address</Text>
        <Text variant="bodyMedium">{hotel?.location?.address}</Text>
        <Text variant="bodyMedium">{hotel?.location?.city}</Text>
        <Text variant="bodyMedium">
          {hotel?.location?.latitude}
          {', '}
          {hotel?.location?.longitude}
        </Text>
      </Card.Content>
      <Card.Actions>
        <Button onPress={handleSeeMoreClick} mode="contained">
          See more
        </Button>
      </Card.Actions>
    </Card>
  );
};

const makeStyles = (theme: Theme) =>
  StyleSheet.create({
    card: {
      backgroundColor: theme.colors.backgroundDark,
      marginBottom: 24,
    },
    divider: {
      backgroundColor: theme.colors.secondary,
      marginVertical: 8,
    },
    checkInOutTimes: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
  });
