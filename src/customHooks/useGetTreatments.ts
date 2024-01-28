import { useQuery } from '@tanstack/react-query';
import { QueryKeys } from 'api/QueryKeys';
import { getTreatmentsHook } from 'api/treatment';
import { parseTreatments } from 'util/parseTreatments';

export const useGetTreatments = (): { data: any; error: any; isLoading: any } => {
  const { data, error, isLoading } = useQuery({
    queryKey: [QueryKeys.TreatmentsHook],
    queryFn: () => getTreatmentsHook(),
  });

  return { data: data?.data?.data ? parseTreatments(data?.data?.data) : [], error, isLoading };
};
