import { useQuery } from '@tanstack/react-query';
import { QueryKeys } from 'api/QueryKeys';
import { getCities } from 'api/cities';
import { parseCities } from 'util/parseCities';

export const useGetCities = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: [QueryKeys.Cities],
    queryFn: () => getCities(),
  });

  return { data: data?.data?.data ? parseCities(data?.data?.data) : undefined, error, isLoading };
};
