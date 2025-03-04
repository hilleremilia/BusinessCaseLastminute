import { Hotel } from '../types/hotel.ts';
import React from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { Card, Divider, Surface, Text, useTheme } from 'react-native-paper';
import { Theme } from '../config/theme.ts';
import { Gallery } from './Gallery.tsx';

interface Props {
  hotel: Hotel;
}

export const HotelDetails = ({ hotel }: Props) => {
  const theme = useTheme<Theme>();
  const styles = makeStyles(theme);

  return (
    <SafeAreaView style={styles.container}>
      <Surface style={styles.container} elevation={0}>
        <Card.Title title="Information" />
        <Divider style={theme.divider} />
        <Card.Content>
          <Text variant="bodySmall">Contact</Text>
          <Text variant="bodyMedium">Phone: {hotel?.contact?.phoneNumber}</Text>
          <Text variant="bodyMedium">Email: {hotel?.contact?.email}</Text>
        </Card.Content>
        <Divider style={theme.divider} />
        <Card.Content style={styles.checkInOutTimes}>
          <View>
            <Text variant="bodySmall">Check In</Text>
            <Text variant="bodyMedium">From {hotel?.checkIn?.from}</Text>
            <Text variant="bodyMedium">To {hotel?.checkIn?.to}</Text>
          </View>
          <View>
            <Text variant="bodySmall">Check Out</Text>
            <Text variant="bodyMedium">From {hotel?.checkOut?.from}</Text>
            <Text variant="bodyMedium">To {hotel?.checkOut?.to}</Text>
          </View>
        </Card.Content>
        <Divider style={theme.divider} />
        <Card.Content style={styles.checkInOutTimes}>
          <Gallery gallery={hotel?.gallery ?? []} />
        </Card.Content>
      </Surface>
    </SafeAreaView>
  );
};

const makeStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      backgroundColor: theme.colors.backgroundLight,
      flex: 1,
    },
    card: {
      marginVertical: 24,
    },
    checkInOutTimes: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
  });
