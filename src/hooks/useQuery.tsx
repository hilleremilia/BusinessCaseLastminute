import { useQuery } from '@tanstack/react-query';
import { api } from '../config/api.ts';

export const useAppQuery = <TData = unknown,>(apiPath: string) => {
  const fetch = async () => {
    const response = await api.get(apiPath);
    return response.data;
  };

  return useQuery<TData>({
    queryKey: [apiPath],
    queryFn: fetch,
  });
};
