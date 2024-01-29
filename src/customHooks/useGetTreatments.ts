import { useQuery } from '@tanstack/react-query';
import { QueryKeys } from 'api/QueryKeys';
import { getTreatmentsHook } from 'api/treatment';
import { deleteDuplicate } from 'util/deleteDuplicate';
import { parseEquipments } from 'util/parseEquipments';
import { parseTreatments } from 'util/parseTreatments';

export const useGetTreatments = (
  treatments: any,
): {
  data: any;
  error: any;
  isLoading: any;
  equipments: any;
  consultingRooms: any;
} => {
  const { data, error, isLoading } = useQuery({
    queryKey: [QueryKeys.TreatmentsHook],
    queryFn: () => getTreatmentsHook(),
  });

  const getFilterTreatments = () => {
    let filterTreatments: any[] = [];
    if (treatments) {
      treatments.map(item => {
        const filterTreatmentAdd = data?.data?.data?.filter(treatment => treatment?.id === Number(item.value));
        filterTreatments = filterTreatments.concat(filterTreatmentAdd);
      });
    }
    return filterTreatments;
  };

  const getEquipments = () => {
    let arrayEquipments: any[] = [];
    let filterTreatments: any[] = getFilterTreatments();
    if (filterTreatments) {
      filterTreatments.map(equipment => {
        arrayEquipments = arrayEquipments.concat(parseEquipments(equipment?.attributes?.equipments?.data));
      });
    }
    return deleteDuplicate(arrayEquipments, 'value');
  };

  const getConsultingsRooms = () => {
    let arrayConsultingsRooms: any[] = [];
    let filterTreatments: any[] = getFilterTreatments();
    if (filterTreatments) {
      filterTreatments.map(consultingRoom => {
        arrayConsultingsRooms = arrayConsultingsRooms.concat(
          parseEquipments(consultingRoom?.attributes?.consultingRooms?.data),
        );
      });
    }
    return deleteDuplicate(arrayConsultingsRooms, 'value');
  };

  return {
    data: data?.data?.data ? parseTreatments(data?.data?.data) : [],
    error,
    isLoading,
    equipments: getEquipments() || [],
    consultingRooms: getConsultingsRooms() || [],
  };
};
