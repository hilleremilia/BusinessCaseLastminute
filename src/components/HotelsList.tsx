import { Surface, useTheme } from 'react-native-paper';
import { useAppQuery } from '../hooks/useQuery.tsx';
import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { HotelListItem } from './HotelListItem.tsx';
import { Hotel } from '../types/hotel.ts';
import { Theme } from '../config/theme.ts';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { EdgeInsets } from 'react-native-safe-area-context/src/SafeArea.types.ts';

export const HotelsList = () => {
  const { data } = useAppQuery<Hotel[]>('hotel.json');
  const theme = useTheme<Theme>();
  const insets = useSafeAreaInsets();
  const styles = makeStyles(theme, insets);

  return (
    <Surface style={styles.surface} elevation={0}>
      {data && (
        <FlatList
          data={data}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <HotelListItem hotel={item} />}
        />
      )}
    </Surface>
  );
};

const makeStyles = (theme: Theme, insets: EdgeInsets) =>
  StyleSheet.create({
    surface: {
      backgroundColor: theme.colors.backgroundLight,
      paddingTop: insets.top,
    },
  });
