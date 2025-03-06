import {
  Button,
  Card,
  Chip,
  Divider,
  IconButton,
  Modal,
  Portal,
  Text,
  useTheme,
} from 'react-native-paper';
import React from 'react';
import { Theme } from '../config/theme.ts';
import { StyleSheet, View } from 'react-native';
import Slider from '@react-native-community/slider';
import { SortOrder } from '../types/common.ts';

export const minRange = 0;
export const maxRange = 500;

const sortLabels = {
  none: 'No Sorting',
  asc: 'A-Z',
  desc: 'Z-A',
};

interface Props {
  onSort: () => void;
  onMinPriceChange: (value: number) => void;
  onMaxPriceChange: (value: number) => void;
  minPrice: number;
  maxPrice: number;
  sortOrder: SortOrder;
}

export const Filters = ({
  onSort,
  onMinPriceChange,
  onMaxPriceChange,
  minPrice,
  maxPrice,
  sortOrder,
}: Props) => {
  const [visible, setVisible] = React.useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  const theme = useTheme<Theme>();
  const styles = makeStyles(theme);

  const getSortLabel = () =>
    sortOrder === 'none' ? sortLabels.none : sortOrder === 'asc' ? sortLabels.asc : sortLabels.desc;

  const allItems = [
    { label: 'Price from', value: minPrice },
    { label: 'Price to', value: maxPrice },
    { label: 'Sort', value: getSortLabel() },
  ];

  return (
    <>
      <Card style={styles.card}>
        <Card.Content style={styles.filtersContainer}>
          <View style={styles.filtersPreview}>
            {allItems.map((item) => (
              <View key={item.label} style={styles.filterItem}>
                <Text style={styles.filterLabel}>{item.label}</Text>
                <Chip selectedColor={theme.colors.textSecondary} style={styles.chip}>
                  {item.value}
                </Chip>
              </View>
            ))}
          </View>

          <IconButton onPress={showModal} iconColor={theme.colors.primary} icon="filter" />
        </Card.Content>
      </Card>
      <Portal>
        <Modal visible={visible} style={styles.modal} onDismiss={hideModal}>
          <Card.Title title="Filters" />
          <Card.Content>
            <Text>Min Price: {minPrice}</Text>
            <Slider
              testID="min-price-slider"
              minimumValue={minRange}
              maximumValue={maxPrice}
              step={10}
              value={minPrice}
              onValueChange={onMinPriceChange}
              minimumTrackTintColor={theme.colors.primary}
            />

            <Text>Max Price: {maxPrice}</Text>
            <Slider
              testID="max-price-slider"
              minimumValue={minPrice}
              maximumValue={maxRange}
              step={10}
              value={maxPrice}
              onValueChange={onMaxPriceChange}
              minimumTrackTintColor={theme.colors.primary}
            />
          </Card.Content>
          <Divider />

          <Card.Title title="Sort" />
          <Card.Content>
            <Button testID="sort-button" mode="contained" onPress={onSort}>
              Sort: {getSortLabel()}
            </Button>
          </Card.Content>
        </Modal>
      </Portal>
    </>
  );
};

const makeStyles = (theme: Theme) =>
  StyleSheet.create({
    card: {
      marginBottom: 2,
    },
    filtersPreview: {
      flexDirection: 'row',
    },
    filtersContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    filterItem: {
      marginRight: 16,
    },
    chip: {
      backgroundColor: theme.colors.primary,
    },
    modal: {
      backgroundColor: theme.colors.background,
      height: '50%',
    },
    filterLabel: {
      paddingBottom: 4,
    },
  });
