import { ActivityIndicator, Surface, Text, useTheme } from 'react-native-paper';
import { useAppQuery } from '../../hooks/useQuery.ts';
import React, { useState } from 'react';
import { FlatList, SafeAreaView, StyleSheet } from 'react-native';
import { HotelListItem } from '../HotelListItem.tsx';
import { Hotel } from '../../types/hotel.ts';
import { Theme } from '../../config/theme.ts';
import { useData } from '../../hooks/useData.ts';
import { Filters, maxRange, minRange } from '../Filters.tsx';

export const HotelsList = () => {
  const [minPrice, setMinPrice] = useState(minRange);
  const [maxPrice, setMaxPrice] = useState(maxRange);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc' | 'none'>('none'); // Sorting state

  const { data, isLoading, isError } = useAppQuery<Hotel[]>('hotel.json');
  const hotels = useData(minPrice, maxPrice, sortOrder, data);

  const theme = useTheme<Theme>();
  const styles = makeStyles(theme);

  const handleMinPriceChange = (value: number) => value < maxPrice && setMinPrice(value);
  const handleMaxPriceChange = (value: number) => value > minPrice && setMaxPrice(value);

  const handleSortOrder = () => {
    setSortOrder((prev) => (prev === 'none' ? 'asc' : prev === 'asc' ? 'desc' : 'none'));
  };

  return (
    <SafeAreaView style={styles.container}>
      <Surface style={styles.container} elevation={0}>
        <Filters
          onSort={handleSortOrder}
          onMinPriceChange={handleMinPriceChange}
          onMaxPriceChange={handleMaxPriceChange}
          minPrice={minPrice}
          maxPrice={maxPrice}
          sortOrder={sortOrder}
        />

        {isError && <Text>An error occurred</Text>}

        {isLoading ? (
          <ActivityIndicator
            testID="activity-indicator"
            animating={true}
            color={theme.colors.primary}
          />
        ) : (
          <>
            {data && (
              <FlatList
                testID="list-items"
                data={hotels}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={styles.flatListContainer}
                renderItem={({ item }) => <HotelListItem hotel={item} />}
              />
            )}
          </>
        )}
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
    slider: {
      height: 40,
    },
    flatListContainer: {
      paddingTop: 24,
      paddingBottom: 60,
    },
  });
