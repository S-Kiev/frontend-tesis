import { useQuery } from '@tanstack/react-query';
import { QueryKeys } from 'api/QueryKeys';
import { getConsultingsRoomsHook } from 'api/consultingRoom';
import { parseConsultingsRooms } from 'util/parseConsultingRooms';

export const useGetConsultingRooms = (): { data: any; error: any; isLoading: any } => {
  const { data, error, isLoading } = useQuery({
    queryKey: [QueryKeys.ConsultingsRoomsHook],
    queryFn: () => getConsultingsRoomsHook(),
  });

  return { data: data?.data?.data ? parseConsultingsRooms(data?.data?.data) : [], error, isLoading };
};
