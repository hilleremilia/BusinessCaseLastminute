import {
  ActivityIndicator,
  Button,
  Card,
  Divider,
  Surface,
  Text,
  useTheme,
} from 'react-native-paper';
import { useAppQuery } from '../../hooks/useQuery.ts';
import React, { useState } from 'react';
import { FlatList, SafeAreaView, StyleSheet } from 'react-native';
import { HotelListItem } from '../HotelListItem.tsx';
import { Hotel } from '../../types/hotel.ts';
import { Theme } from '../../config/theme.ts';
import Slider from '@react-native-community/slider';
import { useData } from '../../hooks/useData.ts';

const minRange = 0;
const maxRange = 500;

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
        <Card style={styles.card}>
          <Card.Title title="Filters" />
          <Card.Content>
            <Text>Min Price: {minPrice}</Text>
            <Slider
              testID="min-price-slider"
              minimumValue={minRange}
              maximumValue={maxPrice}
              step={1}
              value={minPrice}
              onValueChange={handleMinPriceChange}
              minimumTrackTintColor={theme.colors.primary}
            />

            <Text>Max Price: {maxPrice}</Text>
            <Slider
              testID="max-price-slider"
              minimumValue={minRange}
              maximumValue={maxRange}
              step={1}
              value={maxPrice}
              onValueChange={handleMaxPriceChange}
              minimumTrackTintColor={theme.colors.primary}
            />
          </Card.Content>
          <Divider />

          <Card.Title title="Sort" />
          <Card.Content>
            <Button testID="sort-button" mode="contained" onPress={handleSortOrder}>
              Sort: {sortOrder === 'none' ? 'No Sorting' : sortOrder === 'asc' ? 'A-Z' : 'Z-A'}
            </Button>
          </Card.Content>
        </Card>

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
    card: {
      marginBottom: 32,
    },
    slider: {
      height: 40,
    },
    flatListContainer: {
      paddingBottom: 300,
    },
  });
