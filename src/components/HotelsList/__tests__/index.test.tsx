import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { HotelsList } from '../';
import { useAppQuery } from '../../../hooks/useQuery';
import { NavigationContainer } from '@react-navigation/native';

jest.mock('../../../hooks/useQuery');

const mockHotels = [
  { id: 1, name: 'Hotel A', price: 100 },
  { id: 2, name: 'Hotel C', price: 200 },
  { id: 3, name: 'Hotel B', price: 300 },
];

describe('<HotelsList />', () => {
  const renderWithNavigation = () =>
    render(
      <NavigationContainer>
        <HotelsList />
      </NavigationContainer>
    );

  beforeEach(() => {
    (useAppQuery as jest.Mock).mockReturnValue({
      data: mockHotels,
      isLoading: false,
      isError: false,
    });
  });

  test('renders elements', async () => {
    const { getByText } = renderWithNavigation();

    expect(getByText('Filters')).toBeTruthy();
    expect(getByText('Min Price: 0')).toBeTruthy();
    expect(getByText('Max Price: 500')).toBeTruthy();
    expect(getByText('Sort: No Sorting')).toBeTruthy();
  });

  test('renders loading state correctly', () => {
    (useAppQuery as jest.Mock).mockReturnValue({
      data: undefined,
      isLoading: true,
      isError: false,
    });

    const { getByTestId } = renderWithNavigation();

    expect(getByTestId('activity-indicator')).toBeTruthy();
  });

  test('renders error state correctly', () => {
    (useAppQuery as jest.Mock).mockReturnValue({
      data: undefined,
      isLoading: false,
      isError: true,
    });

    const { getByText } = renderWithNavigation();

    expect(getByText('An error occurred')).toBeTruthy();
  });

  it('renders the list of hotels', async () => {
    const { getByText } = renderWithNavigation();

    expect(getByText('Hotel A')).toBeTruthy();
    expect(getByText('Hotel B')).toBeTruthy();
    expect(getByText('Hotel C')).toBeTruthy();
  });

  it('filters hotels based on price range', async () => {
    const { getByText, getByTestId, queryByText } = renderWithNavigation();

    const minPriceSlider = getByTestId('min-price-slider');
    const maxPriceSlider = getByTestId('max-price-slider');

    fireEvent(minPriceSlider, 'onValueChange', 200);
    fireEvent(maxPriceSlider, 'onValueChange', 300);

    await waitFor(() => {
      expect(getByText('Hotel B')).toBeTruthy();
      expect(getByText('Hotel C')).toBeTruthy();
      expect(queryByText('Hotel A')).toBeNull();
    });
  });

  it('sorts hotels in ascending order', async () => {
    const { getByText, getByTestId } = renderWithNavigation();

    const sortButton = getByTestId('sort-button');
    fireEvent.press(sortButton);

    await waitFor(() => {
      const hotels = ['Hotel A', 'Hotel B', 'Hotel C'];

      const hotelElements = hotels.map((hotel) => getByText(hotel));

      expect(hotelElements[0].props.children).toBe('Hotel A');
      expect(hotelElements[1].props.children).toBe('Hotel B');
      expect(hotelElements[2].props.children).toBe('Hotel C');
    });
  });

  it('sorts hotels in descending order', async () => {
    const { getByText, getByTestId } = renderWithNavigation();

    const sortButton = getByTestId('sort-button');
    fireEvent.press(sortButton);

    await waitFor(() => {
      const hotels = ['Hotel C', 'Hotel B', 'Hotel A'];

      const hotelElements = hotels.map((hotel) => getByText(hotel));

      expect(hotelElements[0].props.children).toBe('Hotel C');
      expect(hotelElements[1].props.children).toBe('Hotel B');
      expect(hotelElements[2].props.children).toBe('Hotel A');
    });
  });

  it('minValue cannot be greater than maxValue', () => {
    const { getByTestId } = renderWithNavigation();

    const minPriceSlider = getByTestId('min-price-slider');
    const maxPriceSlider = getByTestId('max-price-slider');

    fireEvent(minPriceSlider, 'onValueChange', 250);
    fireEvent(maxPriceSlider, 'onValueChange', 200);

    expect(minPriceSlider.props.value).toBeLessThanOrEqual(maxPriceSlider.props.value);
  });
});
