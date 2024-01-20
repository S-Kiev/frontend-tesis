import { useQuery } from '@tanstack/react-query';
import { QueryKeys } from 'api/QueryKeys';
import { getCities } from 'api/cities';

export const useGetCities = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: [QueryKeys.Cities],
    queryFn: () => getCities(),
  });

  return { data, error, isLoading };
};
