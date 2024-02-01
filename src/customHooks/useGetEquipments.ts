import { useQuery } from '@tanstack/react-query';
import { QueryKeys } from 'api/QueryKeys';
import { getEquipmentsHook } from 'api/equipment';
import { parseEquipments } from 'util/parseEquipments';

export const useGetEquipments = (): { data: any; error: any; isLoading: any } => {
  const { data, error, isLoading } = useQuery({
    queryKey: [QueryKeys.EquipmentsHook],
    queryFn: () => getEquipmentsHook(),
  });

  return { data: data?.data?.data ? parseEquipments(data?.data?.data) : [], error, isLoading };
};
