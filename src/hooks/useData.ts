import { Hotel } from '../types/hotel.ts';
import { useMemo } from 'react';
import { SortOrder } from '../types/common.ts';

export const useData = (
  minPrice: number,
  maxPrice: number,
  sortOrder: SortOrder,
  data?: Hotel[]
) => {
  const filteredHotels = useMemo(
    () =>
      data?.filter((hotel) => hotel.price && hotel.price >= minPrice && hotel.price <= maxPrice) ??
      [],
    [data, minPrice, maxPrice]
  );

  return useMemo(() => {
    if (sortOrder === 'none') {
      return filteredHotels;
    }

    return [...filteredHotels].sort((a, b) => {
      const nameA = a.name?.toLowerCase() ?? '';
      const nameB = b.name?.toLowerCase() ?? '';

      return sortOrder === 'asc' ? nameA.localeCompare(nameB) : nameB.localeCompare(nameA);
    });
  }, [filteredHotels, sortOrder]);
};
