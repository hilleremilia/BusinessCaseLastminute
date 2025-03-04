import { Surface, useTheme } from 'react-native-paper';
import { useAppQuery } from '../hooks/useQuery.tsx';
import React from 'react';
import { FlatList, SafeAreaView, StyleSheet } from 'react-native';
import { HotelListItem } from './HotelListItem.tsx';
import { Hotel } from '../types/hotel.ts';
import { Theme } from '../config/theme.ts';

export const HotelsList = () => {
  const { data } = useAppQuery<Hotel[]>('hotel.json');
  const theme = useTheme<Theme>();
  const styles = makeStyles(theme);

  return (
    <SafeAreaView style={styles.container}>
      <Surface style={styles.container} elevation={0}>
        {data && (
          <FlatList
            data={data}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => <HotelListItem hotel={item} />}
          />
        )}
      </Surface>
    </SafeAreaView>
  );
};

const makeStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      backgroundColor: theme.colors.backgroundLight,
    },
  });
